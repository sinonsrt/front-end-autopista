import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
});

interface Props {
  image: string;
  title: string;
  text: string;
  imageTitle: string;
  cardAction?: () => void;
  firstButtonAction?: () => void;
  secondButtonAction?: () => void;
}

const InfoCard: React.FC<Props> = ({
  image,
  text,
  title,
  imageTitle,
  cardAction,
  firstButtonAction,
  secondButtonAction,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={cardAction}>
        <CardMedia className={classes.media} image={image} title={imageTitle} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="h2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <b>
        <Typography
          variant="subtitle1"
          color="primary"
          align="center"
          onClick={firstButtonAction}
        >
          CADASTRADOS
        </Typography>
      </b>
    </Card>
  );
};

export default InfoCard;
