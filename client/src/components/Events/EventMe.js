import styled from "styled-components";
import { neutral, typeScale, primary, text } from "../../utils";
import { useHistory } from "react-router";
import { Illustrator } from "../../assets";
import { PlayCircle } from "react-feather";
import Skeleton from "react-loading-skeleton";
import { dateFormat, dateGoToMonth } from "../../shared";

const CardEvent = styled.div`
  background: ${neutral[100]};
  width: 200px;
  height: 200px;
  border-radius: 15px;
  margin-bottom: 35px;
  position: relative;
  margin-right: 40px;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid ${neutral[200]};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  @media (max-width: 700px) {
    margin-bottom: 55px;
  }
`;

const CardDate = styled.div`
  width: 62px;
  height: 62px;
  background: ${neutral[100]};
  position: absolute;
  bottom: -25px;
  left: 20px;
  border-radius: 10px;
  border: 1px solid ${neutral[200]};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  h4 {
    font-style: normal;
    font-weight: bold;
    font-size: ${typeScale.h4};
    line-height: 93.9%;
    text-align: center;
    color: ${neutral[300]};

    span {
      color: ${neutral[600]};
    }
  }
`;

const EventHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EventImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background-image: url(${Illustrator.ImageDummy});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  border: 1px solid ${neutral[300]};
`;

const EventBody = styled.div`
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  h4 {
    font-style: normal;
    font-weight: bold;
    font-size: ${typeScale.h4};
    line-height: 23px;
    color: ${neutral[600]};
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: ${typeScale.helperText};
    line-height: 16px;
    color: ${neutral[300]};
  }

  h6 {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: ${text.text};
    justify-content: flex-end;
    margin-top: 25px;

    svg {
      width: 13px;
      margin-right: 2px;
    }
  }
`;

export const EventMe = ({ webinar, loading, clicked }) => {
  const date = new Date(webinar.date);
  const history = useHistory();

  return (
    <CardEvent>
      <EventHeader>
        {loading ? (
          <Skeleton width={70} height={70} />
        ) : (
          <EventImage
            style={{ backgroundImage: `url(${webinar.cover})` }}
            onClick={(event) => clicked(event, webinar._id)}
          />
        )}
        <div
          style={{
            width: "calc(100% - 80px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {loading ? (
            <Skeleton height={24} width={24} />
          ) : (
            <PlayCircle
              color={webinar.status ? primary[100] : primary[300]}
              style={{ cursor: webinar.status ? "pointer" : "not-allowed" }}
              onClick={() =>
                webinar.status && history.push(`/webinar/${webinar._id}`)
              }
            />
          )}
        </div>
      </EventHeader>
      <EventBody onClick={(event) => clicked(event, webinar._id)}>
        {loading ? (
          <Skeleton width={"100%"} height={23} />
        ) : (
          <h4>
            {webinar.title.length > 14
              ? webinar.title.substring(0, 14) + "..."
              : webinar.title}
          </h4>
        )}
        {loading ? (
          <Skeleton width={"70%"} height={23} />
        ) : (
          <p>
            start at{" "}
            {`${dateFormat(date.getHours())}:${dateFormat(date.getMinutes())}`}{" "}
            WIB
          </p>
        )}
      </EventBody>
      <CardDate>
        {loading ? (
          <Skeleton width={40} height={40} />
        ) : (
          <h4>
            {dateGoToMonth(date.getMonth() + 1).toUpperCase()}
            <br />
            <span>{dateFormat(date.getDate())}</span>
          </h4>
        )}
      </CardDate>
    </CardEvent>
  );
};
