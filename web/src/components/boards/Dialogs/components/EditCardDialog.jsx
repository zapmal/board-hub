import { useState } from 'react';
import { 
  Backdrop, 
  Typography, 
  IconButton,
} from '@material-ui/core';
import { useQuery, useMutation } from 'react-query';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es-us';

import CreateIcon from '@material-ui/icons/Create';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CloseIcon from '@material-ui/icons/Close';

import BaseDialog from '../BaseDialog';
import { Status } from 'components/boards';

import { useStyles, Field, NoDescription } from '../styles';

import { CustomField, Highlight } from 'components/common';

import apiClient from 'services/api';

import team from 'assets/images/team.png';

dayjs.extend(relativeTime);
dayjs.locale('es-us');

/**
 * There's a race condition when switching between cards.
 */
export const EditCardDialog = ({ cardId, handleClose }) => {
  const { data, isLoading, isError } = useQuery('card', async () => {
    const { data } = await apiClient.get(`/cards/${cardId}`);
    return data;
  });
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState({
    title: false,
    content: false,
  });

  if (isLoading) {
    return (
      <Backdrop open={isLoading} className={classes.backdrop}>
        <ScaleLoader loading={isLoading} size={80} color={'#ffffff'} />
      </Backdrop>
    );
  }

  if (isError) {
    return (
      <Backdrop open={isError} className={classes.backdrop}>
        <Status status='error' color='#ffffff' />
      </Backdrop>
    );
  }

  return (
    <BaseDialog
      isOpen={true}
      handleClose={handleClose}
      initialValues={{
        title: data.title,
        content: data.content,
        duedate: data.duedate,
      }}
      customStyles={classes.dialog}
    >
      <div>
        <Typography variant='subtitle1'>
        <LibraryBooksIcon className={classes.alignIcon} />
        {isEditing['title'] ? (
          <CustomField
            type='text'
            name='title'
            color='secondary'
          />
        ) : (
          <strong>{data.title}</strong>
        )}
        <IconButton
            className={classes.editIcon}
            onClick={() =>
              setIsEditing({ ...isEditing, title: !isEditing.title })
            }
          >
            {isEditing['title'] ? <CloseIcon fontSize='small' /> : <CreateIcon fontSize='small' />}
          </IconButton>
        </Typography>
        <Typography variant='caption' display='block'>
          En la lista <Highlight>Research, Ideas n Resources</Highlight>.
        </Typography>
        <Typography variant='caption' display='block'>
          Creada <Highlight>{dayjs(data.createdAt).fromNow()}</Highlight>.
        </Typography>
      </div>
      <Field>
        <Typography variant='subtitle1'>
          <EventNoteIcon className={classes.alignIcon} />
          <strong>Fecha Límite</strong>
          <IconButton
            className={classes.editIcon}
            onClick={() =>
              setIsEditing({ ...isEditing, duedate: !isEditing.duedate })
            }
          >
            {isEditing['duedate'] ? <CloseIcon fontSize='small' /> : <CreateIcon fontSize='small' />}
          </IconButton>
        </Typography>
        {isEditing['duedate'] ? (
          <CustomField
            type='date'
            name='duedate'
            color='secondary'
          />
        ) : (
          data.duedate 
            ? data.duedate
            : (
              <Typography variant='caption'>
                Esta carta <Highlight>no tiene</Highlight> fecha límite.
              </Typography>
            )
        )}
      </Field>
      <Field>
        <Typography variant='subtitle1'>
          <DehazeIcon className={classes.alignIcon} />
          <strong>Descripción</strong>
          <IconButton
            className={classes.editIcon}
            onClick={() => (
              setIsEditing({ ...isEditing, content: !isEditing.content })
            )}
          >
            {isEditing['content'] ? <CloseIcon fontSize='small' /> : <CreateIcon fontSize='small' />}
          </IconButton>
        </Typography>
        {isEditing['content'] ? (
          <div style={{ textAlign: 'center' }}>
            <CustomField
              type='text'
              name='content'
              color='secondary'
              className={classes.content}
              InputProps={{ disableUnderline: true }}
              multiline
              fullWidth
              rows={8}
              rowsMax={10}
            />
            <Typography variant='caption' display='block'>
              Puedes usar <Highlight>Markdown</Highlight>.
            </Typography>
          </div>
        ) : (
          data.content 
            ? <ReactMarkdown source={data.content} />
            : (
              <NoDescription>
                <img src={team} alt='Team' />
                <p>
                  No hay una descripción, agrega una para que sea más fácil <Highlight>manejar esta carta</Highlight>.
                </p>
              </NoDescription>
            )
        )}
      </Field>
    </BaseDialog>
  );
};
