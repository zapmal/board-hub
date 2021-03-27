import makeStyles from '@material-ui/core/styles/makeStyles';
import styled from 'styled-components/macro';

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#ffffff',
  },
  dialog: {
    '& .MuiPaper-root': {
      minWidth: 600,
      height: '100%',
      padding: 10,
    },
    '& .MuiDialogContent-root': {
      minHeight: 500,
    }
  },
  alignIcon: {
    marginBottom: -6,
    marginRight: 15,
  },
  editIcon: {
    marginTop: -4,
  },
  cancelIcon: {
    marginBottom: -10,
  },
  content: {
    border: '1.5px solid #817777',
    borderRadius: '5px',
    padding: 5,
    width: '90%',
    transition: 'all 100ms ease-in',
    '&:hover': {
      border: `1.5px solid green`,
    },
  },
}));

export const Field = styled.div`
  padding: 8px 0;
`;

export const NoDescription = styled.div`
  font-size: 14px;
  text-align: center;
  img {
    width: 380px;
  }
`;
