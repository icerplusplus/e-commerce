import "./index.css";

const DealItem = ({ product }) => {
  return (
    <div key={product.deal_id} className="deal-container cursor-pointer">
      <div className="deal-item">
        <div className="image-container">
          <img
            src={product.product.thumbnail_url}
            alt={product.product.name}
            className="deal-image"
          />
          {product.product.badges_new.map((item, index) => {
            return product.type === "icon_badge" ? (
              <img
                key={index}
                src={product.icon}
                alt="freeship_tikifast"
                className="freeship_tikifast_icon"
              />
            ) : (
              ""
            );
          })}
        </div>

        <div className="product-des">
          <span className="special__price">
            {product.special_price.toLocaleString("it-IT")} ₫
          </span>
          <span className="deals__discount">-{product.discount_percent}%</span>
        </div>
        <div className="deal__qty">
          <div
            className="deal__progress"
            style={{
              width: product.progress.ordered_percent,
            }}
          ></div>
          {product.progress.is_hot_flag &&
          product.progress.is_hot_flag !== "undefined" ? (
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/fire_icon.svg"
              className="fire_icon"
              alt="fire_icon"
            />
          ) : (
            ""
          )}
          {/* {product.progress.status === "progress-bar-success" ? (
                ""
              ) : (
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/fire_icon.svg"
                  className="fire_icon"
                  alt="fire_icon"
                />
              )} */}

          <span>{product.progress.progress_text}</span>
        </div>
      </div>
    </div>
  );
};

export default DealItem;
