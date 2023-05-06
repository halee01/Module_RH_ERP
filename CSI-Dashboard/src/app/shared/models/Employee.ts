import { TechnicalFile } from "./TechnicalFile";
export class Employee {
    id?: number;
     lastName ?:string;
     firstName?:string;
     birthDate ?:string;
     emailOne ?:string;
     emailTwo?:string;
     phoneNumberOne ?: number;
     phoneNumberTwo ?: number;
     address?:string;
     postCode ?: number;
     city ?: string;
     recommendationMark ?: number;
     experience ?: number;
     experienceDetails ?:string;
     civility?: Civility;
     title?: Title;
     employeeStatus?:EmployeeStatus;
     country?:string;
     maritalSituation ?:MaritalSituation;
     technicalfile ?:TechnicalFile ;

}
export interface Country {
    shortName?: string;
    name?: string;
  }

export enum Civility{
    MRS="MRS",
    MS="MS",
    MR="MR"
}
export enum Title{
    FRONT_END_DEVELOPER ="FRONT_END_DEVELOPER",
    BACK_END_DEVELOPER="BACK_END_DEVELOPER",
    FULLSTACK_DEVELOPER="FULLSTACK_DEVELOPER",
    CRM="CRM",
     HUMAN_RESOURCE_MANAGER="HUMAN_RESOURCE_MANAGER",
    HUMAN_RESOURCE="HUMAN_RESOURCE",
    PROJECT_MANAGER="PROJECT_MANAGER",
    TECH_LEAD="TECH_LEAD",
    UI_UX_DESIGNER="UI_UX_DESIGNER",
    QA_ENGINEER="QA_ENGINEER",
    DEVOPS_ENGINEER="DEVOPS_ENGINEER",
    WEB_DEVELOPER="WEB_DEVELOPER",
    OFFICE_MANAGER="OFFICE_MANAGER",
     ACCOUNTANT="ACCOUNTANT",
     SALES_REPRESENTATIVE="SALES_REPRESENTATIVE",
     CUSTOMER_SUPPORT_SPECIALIST="CUSTOMER_SUPPORT_SPECIALIST",
      MARKETING_COORDINATOR="MARKETING_COORDINATOR"
}
export enum EmployeeStatus{
    IN_PROCESS="IN_PROCESS",
     IN_PROGRESS="IN_PROGRESS",
      PRE_QUALIFIED="PRE_QUALIFIED",
       TOP_PROFILES="TOP_PROFILES",
        CONVERTED_TO_RESOURCE=" CONVERTED_TO_RESOURCE",
         DO_NOT_CONTACT=" DO_NOT_CONTACT",
          ARCHIVE="ARCHIVE"
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
    SINGLE="SINGLE",
    MARRIED="MARRIED",
    DIVORCED="DIVORCED",
    WIDOWED="WIDOWED",
    COMPLICATED="COMPLICATED"
}
export enum Provenance {
    LINKEDIN,
    SPONTANEOUS_APPLICATION,
    JOBS_FORUM,
    RECOMMENDATION,
    JOBBOARD,OTHER
}