import React, { useEffect, Fragment } from 'react';
import { Typography, Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'is-empty';
import ReactPlayer from 'react-player';
import Template from '../../../components/template';
import Title from '../../../components/template/titleComponent'
import Categories from '../../../components/categories/showElementCategories';
import LoadingItems from '../../../components/loaders/loadingItems'
import UnavaliableContent from '../../../components/error/unavaliableContent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchItem } from '../../../actions/itemActions';

function SingleVideo(props) {
  const { id } = props.match.params;
  useEffect(() => props.fetchItem(id), []);

  const { title, author, categories, content, extraFields } = props.video.item;

  const useStyles = makeStyles(theme => ({
    banner: {
      background: `#111111`,
      width: '100%',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    videoPlayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      boxShadow: '0px 0px 30px rgba(0,0,0,.7)'
    },
    playerWrapper: {
      position: 'relative',
      paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */
    },
    title: {
      fontWeight: 'bold',
      color: 'white'
    },
    author: {
      fontWeight: 'light',
      color: 'white'
    }
  }));

  const classes = useStyles();

  return (
    <Template noPadding>
      {props.video.loading ? (
        <Box width="100%" height="100%" display="flex" alignContent="center" justifyContent="center">
          <LoadingItems />
        </Box>
      ) : (
          <Fragment>
            {!isEmpty(props.video.item) && props.video.item.type === 'video' ? (
              <Fragment>
                <Title title={title} />
                <Box className={classes.banner}>
                  <Container>
                    <div className={classes.playerWrapper}>
                      <ReactPlayer
                        url={extraFields.videoUrl}
                        className={classes.videoPlayer}
                        width='100%'
                        height='100%'
                      />
                    </div>
                    <Box mt={4}>
                      <Categories categories={categories} />
                      <Typography
                        variant="h4"
                        component="h2"
                        className={classes.title}>
                        {title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="p"
                        className={classes.author}>
                        Participantes: {author}
                      </Typography>
                    </Box>
                  </Container>
                </Box>
                <Container>
                  <Box my={2}>
                    <Typography variant="body1" component="p">
                      {content}
                    </Typography>
                  </Box>
                </Container>
              </Fragment>
            ) : (
              <Container>
                <Box mt={2}>
                  <UnavaliableContent />
                </Box>
              </Container>
            )}
        </Fragment>
      )}
  </Template>
);
}
const mapStateToProps = state => ({ video: state.items });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchItem }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleVideo);
