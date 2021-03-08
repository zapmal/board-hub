import styled from 'styled-components/macro';
import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    minHeight: 170,
    margin: '40px 20px',
  },

  favoriteButton: {
    marginBottom: 3,
  },

  deleteButton: {
    color: theme.palette.error.main,
  },

  isFavorite: {
    color: 'gold',
  },

  top: {
    fontSize: 14,
  },

  name: {
    marginBottom: 12,
  },

  container: {
    justifyContent: 'center',
  },
}));

export const MessageContainer = styled.div`
  display: inline-block;
  border: ${({ noBorder }) => noBorder ? '' : '2px solid #7362d0'};
  border-radius: 10px;
  width: 40%;
  margin: ${({ margin }) => margin}px 65px;
  text-align: center;

  p {
    padding: 20px;
  }

  img {
    display: block;
    margin: 0 auto;
  }
`;

export const HeaderContainer = styled.div`
  margin-top: 40px;
  text-align: center;

  strong {
    color: #7362d0;
  }
`;

export const Separator = styled.div`
  height: 100px;
  background-color: #7362d0;
  text-align: center;

  h4 {
    padding-top: 10px;
  }
`;