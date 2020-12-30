import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { neutral, typeScale, text, primary } from "../../utils";
import { useSpring, animated, config } from "react-spring";
import { ChevronRight as BackIcon, Tag as TagIcon } from "react-feather";
import { Backdrop } from "../UI/Backdrop";
import { useHistory } from "react-router";
import { Illustrator } from "../../assets";
import {
  dateFormat,
  dateGoToMonth,
  dateGoToDay,
  formatRupiah,
} from "../../shared";
import {
  addToCart,
  deleteCart,
  addToBookmark,
  deleteBookmark,
  addToOrder,
} from "../../store/actions";

const EventDetailWrapped = styled(animated.div)`
  width: 360px;
  height: 100%;
  background: ${neutral[100]};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  box-shadow: 0px -99px 80px rgba(0, 0, 0, 0.07),
    0px -41.3598px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px -22.1129px 17.869px rgba(0, 0, 0, 0.0417275),
    0px -12.3963px 10.0172px rgba(0, 0, 0, 0.035),
    0px -6.5836px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px -2.73958px 2.21381px rgba(0, 0, 0, 0.0196802);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const BackButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;

  p {
    font-style: normal;
    font-weight: normal;
    font-size: ${typeScale.copyrightText};
    line-height: 14px;
    color: ${neutral[300]};
    margin-right: 15px;
  }

  svg {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    padding: 5px;
    border: 1px solid ${neutral[300]};
  }
`;

const EventDetailContent = styled.div`
  width: 100%;
  height: 80%;

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: ${text.text};
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }

  .description {
    overflow-y: auto;
    height: 40%;
    margin-top: 20px;

    img {
      height: 100%;
      display: block;
      margin: 0 auto;
    }

    @media (max-width: 700px) {
      height: 45%;
    }

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    p {
      font-style: normal;
      font-weight: normal;
      font-size: ${typeScale.copyrightText};
      line-height: 14px;
      color: ${neutral[400]};

      span {
        color: ${primary[100]};
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`;

const CoverContent = styled.div`
  width: 100%;
  height: 170px;
  background: ${neutral[600]};
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const DateContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: ${typeScale.copyrightText};
    line-height: 14px;
    text-align: left;
    color: ${neutral[600]};
    margin-left: 15px;

    span {
      color: ${neutral[400]};
    }
  }
`;

const ClockTime = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 95.9%;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${neutral[600]};
  background: ${neutral[100]};
  width: 40px;
  height: 40px;
  border: 0.5px solid ${neutral[300]};
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.07),
    0px 1.56354px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 0.465507px 5.32008px rgba(0, 0, 0, 0.0282725);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    color: ${neutral[400]};
  }
`;

const Button = styled.button`
  width: 100%;
  background: ${primary[100]};
  height: 55px;
  border-radius: 10px;
  outline: none;
  border: none;
  font-style: normal;
  font-weight: normal;
  font-size: ${typeScale.paragraph};
  line-height: 19px;
  text-align: center;
  color: ${text.inverted};
  cursor: pointer;

  &:hover {
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(1.1);
  }

  &:disabled {
    background: ${primary[300]};
    cursor: not-allowed;

    &:hover {
      box-shadow: unset;
    }
  }
`;

const Price = styled.h6`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${text.text};
  justify-content: flex-end;

  svg {
    width: 13px;
    margin-right: 2px;
  }
`;

export const EventDetail = ({
  open,
  closeHandler,
  id,
  token,
  setOpen,
  itsMe,
}) => {
  const animation = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? "translateX(0)" : "translateX(-200%)",
    config: config.gentle,
  });

  const [maximise, setMaximise] = useState(false);

  const webinar = useSelector((state) =>
    state.webinar.webinars.filter((webinar) => webinar._id === id)
  )[0];

  const dispatch = useDispatch();

  const cart = useSelector(
    (state) =>
      state.cart.carts.filter(
        (cart) => cart.webinar === (webinar && webinar._id)
      )[0]
  );

  const bookmark = useSelector(
    (state) =>
      state.bookmark.bookmarks.filter(
        (bookmark) => bookmark.webinar === (webinar && webinar._id)
      )[0]
  );

  const order = useSelector(
    (state) =>
      state.order.orders.filter(
        (order) => order.webinar === (webinar && webinar._id)
      )[0]
  );

  const loading = useSelector((state) => state.order.loading);

  const handlerAddToCart = () => {
    dispatch(addToCart(webinar._id, token));
  };

  const handlerDeleteFromCart = () => {
    dispatch(deleteCart(cart && cart._id, token));
  };

  const handlerAddToBookmark = () => {
    dispatch(addToBookmark(webinar._id, token));
  };

  const handlerDeleteFromBookmark = () => {
    dispatch(deleteBookmark(bookmark && bookmark._id, token));
  };

  const handlerAddToOrder = () => {
    bookmark &&
      webinar &&
      bookmark.webinar === webinar._id &&
      dispatch(deleteBookmark(bookmark && bookmark._id, token));

    cart &&
      webinar &&
      cart.webinar === webinar._id &&
      dispatch(deleteCart(cart && cart._id, token));

    dispatch(addToOrder(webinar._id, token));

    setOpen(false);
  };

  const date = new Date(webinar && webinar.date);

  const history = useHistory();

  const handlerLive = () => {
    const id = webinar && webinar._id;
    history.push(`/webinar/${id}`);
  };

  return (
    <>
      <EventDetailWrapped style={animation}>
        <EventDetailContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: !itsMe ? "space-between" : "flex-end",
              marginBottom: 20,
            }}
          >
            {!itsMe && (
              <Price>
                <TagIcon style={{ transform: "scale(-1, 1)" }} /> Rp
                {webinar && formatRupiah(webinar.price.toString())}
              </Price>
            )}
            <BackButton onClick={closeHandler}>
              <p>Back</p>
              <BackIcon />
            </BackButton>
          </div>
          <CoverContent
            style={{ backgroundImage: `url(${webinar && webinar.cover})` }}
          />
          <h1>{webinar && webinar.title}</h1>
          <DateContent>
            <ClockTime>
              {`${dateFormat(date.getHours())}:${dateFormat(
                date.getMinutes()
              )}`}
              <br />
              <span>WIB</span>
            </ClockTime>
            <div>
              <h3>
                {webinar && dateGoToDay(date.getDay().toString())},{" "}
                <span>
                  {webinar &&
                    `${dateGoToMonth(date.getMonth() + 1)} ${dateFormat(
                      date.getDate()
                    )} ${date.getFullYear()}`}
                </span>
              </h3>
              <h3>{webinar && webinar.narasumber}</h3>
            </div>
          </DateContent>
          <div className="description">
            {loading ? (
              <img src={Illustrator.PaymentAnimation} />
            ) : (
              <p>
                {(webinar &&
                  webinar.description.substring(
                    0,
                    maximise ? webinar.description.length : 250
                  )) + (maximise ? " " : "...")}
                <span onClick={() => setMaximise(!maximise)}>
                  {maximise ? "Minimize" : "Read More"}
                </span>
              </p>
            )}
          </div>
        </EventDetailContent>
        <div>
          {!itsMe && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="button"
                style={{
                  marginLeft: 5,
                  background:
                    bookmark && webinar && bookmark.webinar === webinar._id
                      ? primary[300]
                      : primary[100],
                }}
                onClick={
                  bookmark && webinar && bookmark.webinar === webinar._id
                    ? handlerDeleteFromBookmark
                    : handlerAddToBookmark
                }
              >
                {bookmark && webinar && bookmark.webinar === webinar._id
                  ? "Bookmarked"
                  : "Add to Bookmark"}
              </Button>
              <Button
                type="button"
                style={{
                  marginLeft: 5,
                  background:
                    cart && webinar && cart.webinar === webinar._id
                      ? primary[300]
                      : primary[100],
                }}
                onClick={
                  cart && webinar && cart.webinar === webinar._id
                    ? handlerDeleteFromCart
                    : handlerAddToCart
                }
              >
                {cart && webinar && cart.webinar === webinar._id
                  ? "Carted"
                  : "Add to Cart"}
              </Button>
            </div>
          )}
          {itsMe ? (
            <Button
              type="button"
              style={{
                marginTop: 10,
              }}
              disabled={webinar && !webinar.status}
              onClick={handlerLive}
            >
              {webinar && webinar.status ? "Live" : "Wait Webinar Live"}
            </Button>
          ) : (
            <Button
              type="button"
              style={{
                marginTop: 10,
                background:
                  order && webinar && order.webinar === webinar._id
                    ? primary[300]
                    : primary[100],
              }}
              onClick={handlerAddToOrder}
            >
              {loading
                ? "Loading..."
                : order && webinar && order.webinar === webinar._id
                ? "Payment Success"
                : "Buy a Ticket"}
            </Button>
          )}
        </div>
      </EventDetailWrapped>
      {open && <Backdrop onClick={closeHandler} />}
    </>
  );
};
