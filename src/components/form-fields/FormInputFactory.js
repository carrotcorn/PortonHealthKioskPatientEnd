import React from "react";
import {
  FirstName,
  LastName,
  Birthday,
  StreetAddress,
  City,
  Province,
  PostalCode,
} from ".";

// input types
const FIRST_NAME = "FIRST_NAME";
const LAST_NAME = "LAST_NAME";
const BIRTHDAY = "BIRTHDAY";
const STREET_ADDRESS = "STREET_ADDRESS";
const CITY = "CITY";
const PROVINCE = "PROVINCE";
const POSTAL_CODE = "POSTAL_CODE";

export default function formInputFactory(inputType, { errors, name, ...rest }) {
  switch (inputType) {
    case FIRST_NAME:
      return <FirstName errors={errors[name]} name={name} {...rest} />;
    case LAST_NAME:
      return <LastName errors={errors[name]} name={name} {...rest} />;
    case BIRTHDAY:
      return <Birthday errors={errors[name]} name={name} {...rest} />;
    case STREET_ADDRESS:
      return <StreetAddress errors={errors[name]} name={name} {...rest} />;
    case CITY:
      return <City errors={errors[name]} name={name} {...rest} />;
    case PROVINCE:
      return <Province errors={errors[name]} name={name} {...rest} />;
    case POSTAL_CODE:
      return <PostalCode errors={errors[name]} name={name} {...rest} />;
    default:
      throw Error("invalid form input type");
  }
}
