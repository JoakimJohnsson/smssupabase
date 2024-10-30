import React from "react";
import {dangerIconDuoTone, Icon, infoIconDuoTone, statusIconSuccessDuoTone, warningIconDuoTone} from "../../components/icons";
import {
    faBat,
    faBird,
    faCat,
    faComet,
    faDolphin,
    faHippo,
    faStarfighterTwinIonEngineAdvanced,
    faStrawberry,
    faSwords,
    faTRex
} from "@fortawesome/sharp-duotone-solid-svg-icons";

import {PANES} from "./textConstants/texts";

// 69 rader
export const LABELS_AND_HEADINGS = {
    ADMINISTRATE_MESSAGE: "Administrera meddelandet -",
    DELETE_GRADE: "Ta bort skickgradering för",
    COPY_VALUE: "Värde:",
    COPY_NOT_VALUED: "(Värden ej inlagda för denna titel)",
    COPY_VALUE_SEK: "kr",
    FIND_TITLES: "Hitta titlar",
    INFORMATION_ABOUT: "Information om",
    MISSING_ISSUES: "Saknade publikationer",
    MENU: "Meny",
    MESSAGE_TITLE_SUFFIX_FOR: "för",
    MESSAGE_TITLE_SUFFIX_FOR_TITLE: "för titeln",
    MESSAGES_RECEIVED: "Inkomna meddelanden",
    MESSAGES_SENT: "Skickade meddelanden",
    MESSAGE_GLOBAL: "Globalt meddelande",
    MESSAGES_GLOBAL: "Globala meddelanden",
    MESSAGES_GLOBAL_SEND: "Skicka globalt meddelande",
    MESSAGES_FROM_ADMIN: "Meddelanden från Admin",
    MESSAGES_MARK_AS_READ: "Markera som läst",
    MESSAGES_MARK_AS_UNREAD: "Markera som oläst",
    MESSAGES_MARK_AS_ACTIVE: "Markera som aktivt",
    MESSAGES_MARK_AS_INACTIVE: "Markera som inaktivt",
    MESSAGES_MARK_AS_TODO: "Åtgärd krävs",
    CALCULATING_VALUATION: "Beräknar ny värdering!",
    PROFILE_IMAGE: "Profilbild",
    RELEASE_LATEST: "Senaste releasen",
    RELEASE_PREVIOUS: "Tidigare förbättringar",
    RELEASE_FUTURE: "Kommande funktionalitet",
    SEE_ALL_PUBLISHERS: "Se alla förlag",
    SEE_ALL_MESSAGES: "Se alla meddelanden",
    SEE_ALL_TITLES: "Se alla titlar",
    SEE_ALL_USERS: "Se alla användare",
    SHOW_ORIGINAL_IMAGE: "Visa originalbild",
    SIGN_OUT: "Logga ut",
    SKIP_LINK_TEXT: "Gå direkt till innehåll",
    SORT_REVERSE: "Omvänd ordning",
    SORT_CHOSE: "Välj sortering",
    SORT_9_0: "Sortera 9 till 0",
    SORT_0_9: "Sortera 0 till 9",
    SORT_A_Z: "Sortera A till Ö",
    SORT_Z_A: "Sortera Ö till A",
    SOURCE_COMICS: "Källor (Comics.org)",
    START: "Starta",
    START_YEAR: "Startår",
    STATUS_404: "404",
    TOTAL_ISSUES: "Totalt antal utgivna publikationer",
    UPLOAD_NEW_IMAGE: "Ladda upp en ny bild",
    UPLOAD_IMAGE: "Ladda upp en bild",
    UPLOADING_IMAGE: "Laddar upp en bild",
    USERS: "Användare",
}

export const ROUTES = {
    DEFAULT: "/",
    SUCCESS: "/success",
    PROFILE: "/profile",
    CHANGE_PASSWORD: "/change-password",
    TITLES: "/titles",
    TITLE_ID: "/titles/:id",
    ISSUES: "/issues",
    GRADE_VALUES: "/grade-values",
    ISSUE_ID: "/issues/:id",
    PUBLISHERS: "/publishers",
    MARVELKLUBBEN: "/marvelklubben",
    PUBLISHER_ID: "/publishers/:id",
    USERS: "/users",
    USER_ID: "/users/:id",
    DASHBOARD: {
        ROOT: "dashboard",
        OVERVIEW: "overview",
        PATH_OVERVIEW: "/dashboard/overview",
        MY_ISSUES: "my-issues",
        PATH_MY_ISSUES: "/dashboard/my-issues",
        MY_TITLES: "my-titles",
        PATH_MY_TITLES: "/dashboard/my-titles",
        COLLECTIONS: "collections",
        PATH_COLLECTIONS: "/dashboard/collections",
        VALUATION: "valuation",
        PATH_VALUATION: "/dashboard/valuation",
        MAP: "map",
        PATH_MAP: "/dashboard/map"
    },
    ADMIN: {
        ROOT: "/admin",
        ISSUES: "/admin/issues/",
        ISSUE_ID: "/admin/issues/:id",
        ISSUE_EDIT_ID: "/admin/issues/:id/edit",
        PUBLISHERS: "/admin/publishers/",
        PUBLISHER_ID: "/admin/publishers/:id",
        PUBLISHER_ADD: "/admin/publishers/add/",
        PUBLISHER_EDIT_ID: "/admin/publishers/:id/edit",
        TITLES: "/admin/titles/",
        TITLE_ID: "/admin/titles/:id",
        TITLE_ADD: "/admin/titles/add/",
        TITLE_EDIT_ID: "/admin/titles/:id/edit",
        USERS: "/admin/users/",
        MESSAGES: "/admin/messages/",
        MESSAGE_ID: "/admin/messages/:id"
    }
}

export const FILETYPES = {
    AVATAR_IMAGE: "avatar-img-",
    ISSUE_IMAGE: "issue-img-",
    PUBLISHER_IMAGE: "publisher-img-",
    TITLE_IMAGE: "title-img-",
}

export const ALERT_VARIANTS = {
    1: {
        variant: "info",
        icon: <Icon icon={infoIconDuoTone} className={"fa-2xl me-3"}/>
    },
    2: {
        variant: "success",
        icon: <Icon icon={statusIconSuccessDuoTone} className={"fa-2xl me-3"}/>
    },
    3: {
        variant: "warning",
        icon: <Icon icon={warningIconDuoTone} className={"fa-2xl me-3"}/>
    },
    4: {
        variant: "danger",
        icon: <Icon icon={dangerIconDuoTone} className={"fa-2xl me-3"}/>
    },
    5: {
        variant: "danger",
        icon: <Icon icon={dangerIconDuoTone} className={"fa-2xl me-3"}/>
    }
}

export const LOGO_ICONS = [
    faComet,
    faBat,
    faBird,
    faCat,
    faDolphin,
    faStarfighterTwinIonEngineAdvanced,
    faHippo,
    faStrawberry,
    faSwords,
    faTRex
]

export const VARIANT_MAPPER = {
    info: 1,
    success: 2,
    warning: 3,
    danger: 4
}

export const DEFAULT_SEARCH_PARAMS_FORMATS = {
    query: "",
    comic: false,
    comiclarge: false,
    album: false,
    pocket: false,
    hardcover: false,
    special: false
}

export const STATISTICS = {
    TOTAL_TITLES_COUNT: 151,
    TOTAL_MARVELKLUBBEN_ISSUES_COUNT: 592,
}

export const CONFIG = {
    FREQUENT_ICON_INDEX: 0,
    FREQUENT_ICON_PROBABILITY: 0.3,
    TIMEOUT_MEGA_XXL: 10000,
    TIMEOUT_XXL: 2000,
    TIMEOUT_XL: 1000,
    TIMEOUT_LG: 500,
    TIMEOUT_MD: 400,
    TIMEOUT_SM: 200,
    MAX_VALUATION_VALUES: 20,
    PAGINATION_ITEM_COUNT: 25
}

export const GRADE_VARIANTS = {
    0.5: {
        text: "PR",
        displayName: "Poor",
        color: "100"
    },
    1: {
        text: "FR",
        displayName: "Fair",
        color: "100"
    },
    1.5: {
        text: "FR/GD",
        displayName: "Fair / Good",
        color: "100"
    },
    2: {
        text: "GD",
        displayName: "Good",
        color: "200"
    },
    2.5: {
        text: "GD+",
        displayName: "Good (+)",
        color: "200"
    },
    3: {
        text: "GD/VG",
        displayName: "Good / Very good",
        color: "200"
    },
    3.5: {
        text: "VG-",
        displayName: "Very good (-)",
        color: "300"
    },
    4: {
        text: "VG",
        displayName: "Very good",
        color: "300"
    },
    4.5: {
        text: "VG+",
        displayName: "Very good (+)",
        color: "300"
    },
    5: {
        text: "VG/FN",
        displayName: "Very good / Fine",
        color: "400"
    },
    5.5: {
        text: "FN-",
        displayName: "Fine (-)",
        color: "500"
    },
    6: {
        text: "FN",
        displayName: "Fine",
        color: "600"
    },
    6.5: {
        text: "FN+",
        displayName: "Fine (+)",
        color: "700"
    },
    7: {
        text: "FN/VF",
        displayName: "Fine / Very fine",
        color: "700"
    },
    7.5: {
        text: "VF-",
        displayName: "Very fine (-)",
        color: "800"
    },
    8: {
        text: "VF",
        displayName: "Very fine",
        color: "800"
    },
    8.5: {
        text: "VF+",
        displayName: "Very fine (+)",
        color: "800"
    },
    9: {
        text: "VF/NM",
        displayName: "Very fine / Near mint",
        color: "0"
    },
    9.2: {
        text: "NM-",
        displayName: "Near mint (-)",
        color: "0"
    },
    9.4: {
        text: "NM",
        displayName: "Near mint",
        color: "0"
    },
    9.6: {
        text: "NM+",
        displayName: "Near mint (+)",
        color: "0"
    },
    9.8: {
        text: "NM/M",
        displayName: "Near mint / mint",
        color: "0"
    },
    9.9: {
        text: "M",
        displayName: "Mint",
        color: "0"
    }
}

export const GRADE_RADIOS = [
    {name: 'PR', value: 0.5},
    {name: 'FR', value: 1.0},
    {name: 'FR/GD', value: 1.5},
    {name: 'GD', value: 2.0},
    {name: 'GD/VG', value: 3.0},
    {name: 'VG-', value: 3.5},
    {name: 'VG', value: 4.0},
    {name: 'VG+', value: 4.5},
    {name: 'VG/FN', value: 5.0},
    {name: 'FN-', value: 5.5},
    {name: 'FN', value: 6.0},
    {name: 'FN+', value: 6.5},
    {name: 'FN/VF', value: 7.0},
    {name: 'VF-', value: 7.5},
    {name: 'VF', value: 8.0},
    {name: 'VF+', value: 8.5},
    {name: 'VF/NM', value: 9.0},
    {name: 'NM-', value: 9.2},
    {name: 'NM', value: 9.4},
    {name: 'NM+', value: 9.6},
    {name: 'NM/M', value: 9.8},
    {name: 'M', value: 9.9},
];

export const SK_GRADE_RADIO_VALUES = [
    2.0, 4.0, 6.0, 8.0, 9.4
];

export const SK_GRADE_RADIO_NAMES = [
    "GD", "VG", "FN", "VF", "NM"
];

export const LOADING_STATES = {
    NONE: 'none',
    GENERAL: 'general',
    NEW_VALUE: 'new_value',
    GENERATE_ISSUES: 'generate_issues',
    DELETE_ISSUES: 'delete_issues',
    IS_VALUED: 'is_valued',
    GRADE_VALUES: 'grade_values',
    // Add other specific states as needed
};

export const COLOR_VARIABLE_NAMES = {
    PRIMARY: "#41bee0",
    SECONDARY: "#bccad1",
    SUCCESS: "#33cc99",
    INFO: "#e3af9b",
    WARNING: "#f797d2",
    DANGER: "#ed5353",
    GRADE: "#ffd700",
    FORMAT: "#f09f59",
    COUNTRY: "#7ad145",
    COUNTRY_DARKER: "#182d0b",
    PUBLISHER: "#bc84f5",
    TITLE: "#ccff66",
    ISSUE: "#ede798",
    MARVELKLUBBEN: "#ed1d24",
    WHITE: "#fff",
    WHITE_DARKER: "#c0c7cf",
    BLACK: "#000",
    BLACK_LIGHTER: "#444",
    BLACK_LIGHTEST: "#999"
}

export const MAP_CONFIG = {
    POSITIONS: {
        NYKOPING: {lat: 58.7609194, lng: 16.9803637},
    },
    COLORS: {
        PIN_BACKGROUND: COLOR_VARIABLE_NAMES.COUNTRY,
        PIN_BACKGROUND_VARIANT: COLOR_VARIABLE_NAMES.COUNTRY_DARKER,
        PIN_BORDER: COLOR_VARIABLE_NAMES.COUNTRY,
        PIN_BORDER_VARIANT: COLOR_VARIABLE_NAMES.COUNTRY_DARKER,
        PIN_GLYPH: COLOR_VARIABLE_NAMES.COUNTRY_DARKER,
        PIN_GLYPH_VARIANT: COLOR_VARIABLE_NAMES.COUNTRY
    },
    REQUESTS: {
        FLEA_MARKET: {
            query: ["flea market", "loppisar", "loppmarknad"],
            fields: ["name", "geometry"],
            name: PANES.MAP.FLEA_MARKETS,
        },
        SECOND_HAND: {
            query: ["Second hand"],
            fields: ["name", "geometry"],
            name: PANES.MAP.SECOND_HAND_SHOPS
        },
        COMIC_BOOK_STORE: {
            query: ["Serietidningar butik", "comic book store"],
            fields: ["name", "geometry"],
            name: PANES.MAP.COMIC_BOOK_STORES
        },
    }
}
