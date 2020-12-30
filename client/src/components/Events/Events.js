import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Event } from "./Event";
import { EventMe } from "./EventMe";
import { neutral, typeScale, primary } from "../../utils";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
import { EventDetail } from "./EventDetail";

import "swiper/swiper.scss";
import "swiper/components/lazy/lazy.scss";

SwiperCore.use([Mousewheel]);

const EventWrapped = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const TextTitle = styled.h2`
  font-weight: 500;
  font-size: ${typeScale.h2};
  line-height: 33px;
  color: ${neutral[600]};
`;

const LinkText = styled(Link)`
  font-style: normal;
  font-weight: normal;
  font-size: ${typeScale.copyrightText};
  line-height: 14px;
  color: ${primary[100]};
  text-decoration: none;
`;

export const Events = ({ title, webinars, itsMe }) => {
  const loading = useSelector((state) => state.webinar.loading);
  const token = useSelector((state) => state.auth.token);
  const orders = useSelector((state) => state.order.orders);
  const [openDetail, setOpenDetail] = useState(false);
  const [idWebinar, setIdWebinar] = useState("");

  const handlerOpenDetail = (event, id) => {
    setIdWebinar(id);
    setOpenDetail(true);
  };

  return (
    <>
      <EventWrapped>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <TextTitle>{title}</TextTitle>
          {itsMe && <LinkText to="/">show all</LinkText>}
        </div>
        <Swiper
          style={{
            display: "flex",
            width: "100%",
            paddingLeft: 2,
          }}
          spaceBetween={50}
          slidesPerView={1.5}
          mousewheel
          breakpoints={{
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 5.5,
            },
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {!itsMe
            ? webinars
                .filter(
                  (webinar) =>
                    !orders.some((order) => order.webinar === webinar._id)
                )
                .map((webinar) => (
                  <SwiperSlide key={webinar._id}>
                    <Event
                      webinar={webinar}
                      loading={loading}
                      clicked={handlerOpenDetail}
                      token={token}
                    />
                  </SwiperSlide>
                ))
            : webinars
                .filter((webinar) =>
                  orders.some((order) => order.webinar === webinar._id)
                )
                .map((webinar) => (
                  <SwiperSlide key={webinar._id}>
                    <EventMe
                      webinar={webinar}
                      loading={loading}
                      clicked={handlerOpenDetail}
                      token={token}
                    />
                  </SwiperSlide>
                ))}
        </Swiper>
      </EventWrapped>
      <EventDetail
        open={openDetail}
        closeHandler={() => setOpenDetail(false)}
        setOpen={setOpenDetail}
        id={idWebinar}
        token={token}
        itsMe={itsMe}
      />
    </>
  );
};
