export function mapTitle(selectedOption) {
  switch (selectedOption) {
    case "option1":
      return "Java Developer";
    case "option2":
      return "DevOps Engineer";
    case "option3":
      return "Python Developer";
    case "option4":
      return "Web Designer";
    case "option5":
      return "HR";
    case "option6":
      return "Testing";
    case "option7":
      return "Operations Manager";
    case "option8":
      return "Hadoop";
    case "option9":
      return "Data Science";
    case "option10":
      return "Blockchain";
    case "option11":
      return "ETL Developer";
    case "option12":
      return "Mechanical Engineer";
    case "option13":
      return "Sales";
    case "option14":
      return "Arts";
    case "option15":
      return "Database";
    case "option16":
      return "Electrical Engineering";
    case "option17":
      return "PMO";
    case "option18":
      return "Health and fitness";
    case "option19":
      return "Business Analyst";
    case "option20":
      return "DotNet Developer";
    case "option21":
      return "Automation Testing";
    case "option22":
      return "Network Security Engineer";
    case "option23":
      return "SAP Developer";
    case "option24":
      return "Civil Engineer";
    case "option25":
      return "Advocate";
    default:
      return "";
  }
}

export function mapCountry(countryName, countryList) {
  const country = countryList.find((c) => c.countryName === countryName);
  return country ? country.countryCode : "";
}
