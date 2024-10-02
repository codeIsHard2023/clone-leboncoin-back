import { Link } from "react-router-dom";
import classes from "./AdCard.module.css";

export type AdProps = {
  id: number;
  picture: string;
  title: string;
  price: number;
};

export const AdCard = (
  props: AdProps & {
    onAddToCard: () => void;
  }
) => {
  const { id, picture, title, price, onAddToCard } = props;

  return (
    <>
      <div className={classes.adCardContainer}>
        <Link className={classes.adCardLink} to={`/ads/${id}`}>
          <img className={classes.adCardImage} src={picture} alt={title} />
          <div className={classes.adCardText}>
            <div className={classes.adCardTitle}>{title}</div>
            <div className={classes.adCardPrice}>{price} €</div>
          </div>
        </Link>
        <button className={classes.button} onClick={onAddToCard}>
          Ajouter dans le panier
        </button>
      </div>
    </>
  );
};
