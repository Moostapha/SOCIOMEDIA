import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // Form library
import * as yup from "yup"; // Validation form
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setUserAlert } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// Yup Validation schema for register form inputs
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

// Yup validation schema for login form inputs
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// initial values for each forms (empty strings vide)
const initialValuesRegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLoginForm = {
  email: "",
  password: "",
};

export const Form = () => {
  // STATE SETTINGS + IMPORT USE

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Custom Color Theme
  const { palette } = useTheme();

  // CUSTOM BOOLEAN
  // Media query for mobiles
  const isNonMobile = useMediaQuery("min-width:600px");

  // Check si page login ou register
  // Page login ou register pour envoyer différents forms selon que le user posséde ou pas already un compte cf state/index.js
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // FUNCTIONS
  // NOTES https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  // register function values = infos entrées dans les champs de form | onSubmitProps to reset the form (FORMIK)
  const register = async (values, onSubmitProps) => {
      
      // Envoi au server des inputs du formulaire register avec fromData
      const formData = new FormData();
      // append values infos avec une boucle sur le tableau de values
      for (let value in values) {
        formData.append(value, values[value]);
      }
      // append image entrée dans Model User => picturePath
      formData.append("picturePath", values.picture.name);
      
      // api call POST register values with fetch JS api to the endpoint
      const savedUserResponse = await fetch(
        "http://localhost:3001/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      // réponse de la logique register du controller backend
      const savedUser = await savedUserResponse.json();

      // form reset with formik onSubmitProps
      onSubmitProps.resetForm();

      // Passage à la page login après register
      if (savedUser) {
        setPageType("login");
      }
  };

  // login function
  const login = async (values, onSubmitProps) => {
    //try {
      // api call endpoint
      const loggedInResponse = await fetch(
        "http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
      });

      console.log("Objet response", loggedInResponse);

      // network error in the 4xx–5xx range
      // if (!loggedInResponse.ok) {
      //   throw new Error (
      //     `${loggedInResponse.status} ${loggedInResponse.statusText}`,
      //   )
      // }

      // extraction objet json de la réponse
      const loggedIn = await loggedInResponse.json();
      console.log(loggedIn);
      onSubmitProps.resetForm();

        // NOTES redux state reducers setLogin + setUserAlert
        if (loggedIn) {
          dispatch(
            setLogin({ user: loggedIn.user, token: loggedIn.token }),
            dispatch(setUserAlert({
                showAlert: true,
                alertType: "success",
                alertMsg: "Connexion Succeed",
              })
            )
          );
          navigate("/home");
        }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // Form function with arguments from Formik and login + register functions
  const handleFormSubmit = async (values, onSubmitProps) => {
    // si login page
    if (isLogin) await login(values, onSubmitProps);

    // si register page
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    // Formik setup
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        isLogin ? initialValuesLoginForm : initialValuesRegisterForm
      }
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        // Formulaire (register ou login avec son style et ses conditions)
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* Inputs fields Si register */}
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  // Situation When clicking out of an input
                  onBlur={handleBlur}
                  // Situation When typing in an input
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  // errors
                  error={Boolean(touched.firstName) && errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && errors.location}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && errors.occupation}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />

                {/* DROPZONE BOX Image upload */}
                <Box
                  gridColumn="span 4"
                  p="1rem"
                  borderRadius="5px"
                  border={`1px solid ${palette.neutral.medium}`}
                >
                  {/* Dropzone file img upload settings */}
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false} // just one file at a time
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add a picture here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                  {/* end */}
                </Box>
                {/* end */}
              </>
            )}
            {/* fin */}

            {/* Inputs fields si login */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && errors.password}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            {/* fin */}
          </Box>

          {/* BUTTONS BOX */}
          <Box>
            <Button
              //onClick={() => {dispatch(setUserAlert({showAlert: true,alertType: "success",alertMsg: "Connexion réussie",}));}}
              type="submit"
              fullWidth
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { backgroundColor: palette.primary.dark },
              }}
            >
              {/* Bouton rendu conditionnel */}
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              {/* Rendu conditionnel */}
              {isLogin
                ? "Pas de compte ? Inscription ici."
                : "Déjà un compte ? connexion ici."}
            </Typography>
          </Box>
          {/* fin */}
        </form>
        // end
      )}
    </Formik>
    //end
  );
};

export default Form;
