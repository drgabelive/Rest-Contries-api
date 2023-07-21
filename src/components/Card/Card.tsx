type CardProps = {
  flag: string;
  country: string;
  population: number;
  region: string;
  capital: string;
  alt: string;
};

const Card = (props: CardProps) => {
  return (
    <div className="main-container">
      <div className="card-container">
        <div>
          <img className="flag" src={props.flag} alt={props.alt} /> 
        </div>
        <div className="details">
          <div>
            <span className="country">{props.country}</span>
          </div>
          <div>
            <p className="par">
              Population: <span className="population">{props.population}</span>
            </p>
            <p className="par">
              Region: <span className="region">{props.region}</span>
            </p>
            <p className="par">
              Capital: <span className="capital">{props.capital}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
