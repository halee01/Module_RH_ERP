export class Employee {
    Id?: number;
     lastName ?:string;
     firstName?:string;
     birthDate ?:string;
     emailOne ?:string;
     emailTwo?:string;
     phoneNumberOne ?: number;
     phoneNumberTwo ?: number;
     address?:string;
     postCode ?: number;
     city ?: number;
     recommendationMark ?: number;
     experience ?: number;
     experienceDetails ?:string;
     civility?: Civility;
     title?: Title;
     employeeStatus?:EmployeeStatus;
     country?:Country;
     maritalSituation ?:MaritalSituation;
}

export enum Civility{
    MRS="Mme",
    MS="Mlle",
    MR="Mr"
}
export enum Title{
    FRONT_END_DEVELOPER ="Front end developpeur",
    BACK_END_DEVELOPER="Back end developpeur",
    FULLSTACK_DEVELOPER="FullStack developpeur",
    CRM="CRM",
     HUMAN_RESOURCE_MANAGER="Manager Ressources Humaines",
    HUMAN_RESOURCE="Resoources Humaines",
    PROJECT_MANAGER="Manager Projet",
    TECH_LEAD="Consultant Technique",
    UI_UX_DESIGNER="Ui_Ux Designer",
    QA_ENGINEER="Ingénieur QA",
    DEVOPS_ENGINEER="Ingénieur DevOps",
    WEB_DEVELOPER="Developpeur Web",
    OFFICE_MANAGER="Manager Office",
     ACCOUNTANT="Financier",
     SALES_REPRESENTATIVE="Représentant Ventes",
     CUSTOMER_SUPPORT_SPECIALIST="Spécialiste Support Client",
      MARKETING_COORDINATOR="Coordinateur Marketing"
}
export enum EmployeeStatus{
    IN_PROCESS, IN_PROGRESS, PRE_QUALIFIED, TOP_PROFILES, CONVERTED_TO_RESOURCE, DO_NOT_CONTACT, ARCHIVE
}
/*export enum Country{
    USA,
        AFGHANISTAN,
        ALBANIA,
        ALGERIA,
        ANDORRA,
        ANGOLA,
        ANTIGUA_DEPS,
        ARGENTINA,
        ARMENIA,
        AUSTRALIA,
        AUSTRIA,
        AZERBAIJAN,
        BAHAMAS,
        BAHRAIN,
        BANGLADESH,
        BARBADOS,
        BELARUS,
        BELGIUM,
        BELIZE,
        BENIN,
        BHUTAN,
        BOLIVIA,
        BOSNIA_HERZEGOVINA,
        BOTSWANA,
        BRAZIL,
        BRUNEI,
        BULGARIA,
        BURKINA,
        BURMA,
        BURUNDI,
        CAMBODIA,
        CAMEROON,
        CANADA,
        CAPE_VERDE,
        CENTRAL_AFRICAN_REP,
        CHAD,
        CHILE,
        CHINA,
        REPUBLIC_OF_CHINA,
        COLOMBIA,
        COMOROS,
        DEMOCRATIC_REPUBLIC_OF_THE_CONGO,
        REPUBLIC_OF_THE_CONGO,
        COSTA_RICA,
        CROATIA,
        CUBA,
        CYPRUS,
        CZECH_REPUBLIC,
        DANZIG,
        DENMARK,
        DJIBOUTI,
        DOMINICA,
        DOMINICAN_REPUBLIC,
        EAST_TIMOR,
        ECUADOR,
        EGYPT,
        EL_SALVADOR,
        EQUATORIAL_GUINEA,
        ERITREA,
        ESTONIA,
        ETHIOPIA,
        FIJI,
        FINLAND,
        FRANCE,
        GABON,
        GAZA_STRIP,
        THE_GAMBIA,
        GEORGIA,
        GERMANY,
        GHANA,
        GREECE,
        GRENADA,
        GUATEMALA,
        GUINEA,
        GUINEA_BISSAU,
        GUYANA,
        HAITI,
        HOLY_ROMAN_EMPIRE,
        HONDURAS,
        HUNGARY,
        ICELAND,
        INDIA,
        INDONESIA,
        IRAN,
        IRAQ,
        REPUBLIC_OF_IRELAND,
        PALESTIANE,
        ITALY,
        IVORY_COAST,
        JAMAICA,
        JAPAN,
        JONATHANLAND,
        JORDAN,
        KAZAKHSTAN,
        KENYA,
        KIRIBATI,
        NORTH_KOREA,
        SOUTH_KOREA,
        KOSOVO,
        KUWAIT,
        KYRGYZSTAN,
        LAOS,
        LATVIA,
        LEBANON,
        LESOTHO,
        LIBERIA,
        LIBYA,
        LIECHTENSTEIN,
        LITHUANIA,
        LUXEMBOURG,
        MACEDONIA,
        MADAGASCAR,
        MALAWI,
        MALAYSIA,
        MALDIVES,
        MALI,
        MALTA,
        MARSHALL_ISLANDS,
        MAURITANIA,
        MAURITIUS,
        MEXICO,
        MICRONESIA,
        MOLDOVA,
        MONACO,
        MONGOLIA,
        MONTENEGRO,
        MOROCCO,
        MOUNT_ATHOS,
        MOZAMBIQUE,
        NAMIBIA,
        NAURU,
        NEPAL,
        NEWFOUNDLAND,
        NETHERLANDS,
        NEW_ZEALAND,
        NICARAGUA,
        NIGER,
        NIGERIA,
        NORWAY,
        OMAN,
        OTTOMAN_EMPIRE,
        PAKISTAN,
        PALAU,
        PANAMA,
        PAPUA_NEW_GUINEA,
        PARAGUAY,
        PERU,
        PHILIPPINES,
        POLAND,
        PORTUGAL,
        PRUSSIA,
        QATAR,
        ROMANIA,
        ROME,
        RUSSIAN_FEDERATION,
        RWANDA,
        GRENADINES,
        SAMOA,
        SAN_MARINO,
        SAO_TOME_PRINCIPE,
        SAUDI_ARABIA,
        SENEGAL,
        SERBIA,
        SEYCHELLES,
        SIERRA_LEONE,
        SINGAPORE,
        SLOVAKIA,
        SLOVENIA,
        SOLOMON_ISLANDS,
        SOMALIA,
        SOUTH_AFRICA,
        SPAIN,
        SRI_LANKA,
        SUDAN,
        SURINAME,
        SWAZILAND,
        SWEDEN,
        SWITZERLAND,
        SYRIA,
        TAJIKISTAN,
        TANZANIA,
        THAILAND,
        TOGO,
        TONGA,
        TRINIDAD_TOBAGO,
        TUNISIA,
        TURKEY,
        TURKMENISTAN,
        TUVALU,
        UGANDA,
        UKRAINE,
        UNITED_ARAB_EMIRATES,
        UNITED_KINGDOM,
        URUGUAY,
        UZBEKISTAN,
        VANUATU,
        VATICAN_CITY,
        VENEZUELA,
        VIETNAM,
        YEMEN,
        ZAMBIA,
        ZIMBABWE
}*/
export interface Country{
    shortName?: string;
    name?: string;
}
export enum MaritalSituation {
    SINGLE="Célibataire",
    MARRIED="Marrié",
    DIVORCED="Divorcé",
    WIDOWED="veuf / veuve",
    COMPLICATED="Compliqué"
}
export enum Provenance {
    LINKEDIN,
    SPONTANEOUS_APPLICATION,
    JOBS_FORUM,
    RECOMMENDATION,
    JOBBOARD,OTHER
}