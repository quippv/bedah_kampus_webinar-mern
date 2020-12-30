import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import { primaryFont } from "./typography";

export const Global = createGlobalStyle`
    ${normalize()}
    html {
        font-size: 16px;
        box-sizing: border-box;
    }

    
    *, *::before, *::after {
        box-sizing: inherit;
    }

    *::selection {
        color: white;
        background: black;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: ${primaryFont};
        box-sizing: border-box;
    }

    body {
        width: 100%;
    }

    h1, h2, h3, h4, h5, h6, p, label {
        margin: 0;
        padding: 0;
    }

    main {
        width: 90%;
        margin: 0 auto;
    }
`;
