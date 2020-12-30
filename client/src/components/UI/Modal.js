import { useState, useRef, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { Backdrop } from "./Backdrop";
import { PrimaryButton } from "./Buttons";
import { X as XIcon, Check as CheckIcon } from "react-feather";
import { neutral, typeScale, primary, text } from "../../utils";
import { Illustrator } from "../../assets";
import { Input, ErrorText } from "./TextFields";
import { Spinner } from "./Spinner";
import { authData } from "../../store/actions";
import { updateObject, validation } from "../../shared";

const ModalWrapper = styled(animated.div)`
  width: 50%;
  height: 496px;
  background: ${neutral[100]};
  position: fixed;
  z-index: 100;
  top: 100px;
  left: 25%;
  border-radius: 8px;
  display: flex;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 700px) {
    width: 90%;
    left: 5%;
    justify-content: center;
  }
`;

const ModalImage = styled.div`
  width: 40%;
  height: 100%;
  border-radius: 0 8px 8px 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 700px) {
    display: none;
  }
`;

const CloseIcon = styled(XIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 110;
  cursor: pointer;
  color: ${neutral[100]};

  @media (max-width: 700px) {
    color: ${text.text};
  }
`;

const Form = styled.form`
  width: 60%;
  padding: 50px;

  @media (max-width: 700px) {
    width: 90%;
    padding: 50px 0;
  }
`;

const ModalTitle = styled.h1`
  font-weight: 500;
  font-size: ${typeScale.h1};
  line-height: 33px;
  text-align: center;
  margin-bottom: 10px;
  color: ${primary[100]};
`;

const ModalText = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: ${typeScale.copyrightText};
  line-height: 14px;
  text-align: center;
  color: ${neutral[500]};
  margin-bottom: 40px;

  span {
    color: ${primary[100]};
    cursor: pointer;
  }
`;

const Text = styled.p`
  font-weight: normal;
  font-size: ${typeScale.helperText};
  line-height: 16px;
  color: ${neutral[500]};

  span {
    color: ${primary[100]};
    cursor: pointer;
  }
`;

export const ModalAuth = withRouter(
  ({ showModal, closeModal, toggle, isSignUp, history }) => {
    const [agreement, setAgreement] = useState(false);
    const refAgreement = useRef();
    const dispatch = useDispatch();

    // Global State Auth
    const errorMessage = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);

    const [datas, setDatas] = useState({
      name: {
        type: "text",
        placeholder: "Name",
        value: "",
        valid: true,
        touch: false,
        textError: "This field can't be empty",
      },
      email: {
        type: "email",
        placeholder: "Email",
        value: "",
        valid: false,
        touch: false,
        textError: "ex: example@test.com",
        autoComplete: "username",
      },
      password: {
        type: "password",
        placeholder: "Password",
        value: "",
        valid: false,
        touch: false,
        textError: "Password must 8 min length",
        autoComplete: "current-password",
      },
    });

    const datasArray = [];
    for (const key in datas) {
      datasArray.push({
        id: key,
        data: {
          ...datas[key],
        },
      });
    }

    const changeHandler = (event, id) => {
      setDatas(
        updateObject(datas, {
          [id]: updateObject(datas[id], {
            value: event.target.value,
            touch: true,
            valid: validation(id, event.target.value),
          }),
        })
      );
    };

    const submitHandler = (event) => {
      event.preventDefault();
      const user = {
        name: datas.name.value,
        email: datas.email.value,
        password: datas.password.value,
      };

      dispatch(authData(user, isSignUp));
      history.push("/home");
    };

    const animation = useSpring({
      opacity: showModal ? 1 : 0,
      transform: showModal ? "translateY(0)" : "translateY(-200%)",
      config: config.slow,
    });

    let form = isSignUp ? (
      <>
        {datasArray.map((data) => (
          <Fragment key={data.id}>
            <Input
              placeholder={data.data.placeholder}
              type={data.data.type}
              onChange={(e) => changeHandler(e, data.id)}
              modifiers={
                data.data.touch ? (data.data.valid ? "valid" : "invalid") : null
              }
              autoComplete={data.data.autoComplete}
            />
            {data.data.touch && !data.data.valid && (
              <ErrorText>{data.data.textError}</ErrorText>
            )}
          </Fragment>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PrimaryButton
            modifiers="icon"
            type="button"
            style={{
              background: agreement ? primary[100] : neutral[300],
            }}
            onClick={() => setAgreement(!agreement)}
            ref={refAgreement}
          >
            {agreement ? (
              <CheckIcon style={{ width: 12 }} />
            ) : (
              <XIcon style={{ width: 12, color: neutral[400] }} />
            )}
          </PrimaryButton>
          <Text
            style={{ marginLeft: 10 }}
            onClick={() => refAgreement.current.click()}
          >
            I agree to the <span>Terms</span> and <span>Privacy Policy.</span>
          </Text>
        </div>
      </>
    ) : (
      <>
        {datasArray
          .filter((data) => data.id !== "name")
          .map((data) => (
            <Fragment key={data.id}>
              <Input
                placeholder={data.data.placeholder}
                type={data.data.type}
                onChange={(e) => changeHandler(e, data.id)}
                modifiers={
                  data.data.touch
                    ? data.data.valid
                      ? "valid"
                      : "invalid"
                    : null
                }
                autoComplete={data.data.autoComplete}
              />
              {data.data.touch && !data.data.valid && (
                <ErrorText>{data.data.textError}</ErrorText>
              )}
            </Fragment>
          ))}
      </>
    );

    if (loading) {
      form = <Spinner />;
    }

    return (
      <>
        {showModal && <Backdrop onClick={closeModal} />}
        <ModalWrapper style={animation}>
          <CloseIcon onClick={closeModal} />
          <Form onSubmit={submitHandler}>
            <ModalTitle>{isSignUp ? "Create Account" : "Welcome"}</ModalTitle>
            <ModalText>
              {isSignUp
                ? "Already have a Bedah Kampus account? "
                : "Don't have a Bedah Kampus account? "}
              <span onClick={toggle}>{isSignUp ? "Sign In" : "Sign Up"}</span>
            </ModalText>
            {form}
            <PrimaryButton
              style={{ margin: "20px auto", display: "block" }}
              disabled={
                isSignUp
                  ? datas.name.valid &&
                    datas.email.valid &&
                    datas.password.valid &&
                    agreement
                    ? false
                    : true
                  : datas.email.valid && datas.password.valid
                  ? false
                  : true
              }
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </PrimaryButton>
            {errorMessage !== null && (
              <ErrorText style={{ textAlign: "center" }}>
                {errorMessage}
              </ErrorText>
            )}
          </Form>
          <ModalImage
            style={{
              backgroundImage: `url(${
                isSignUp
                  ? Illustrator.SignUpBackground
                  : Illustrator.SignInBackground
              })`,
            }}
          />
        </ModalWrapper>
      </>
    );
  }
);
