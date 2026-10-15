import type { Locale } from "@/lib/i18n/config";

export const contactInfo = {
  company: "JIANGSU ZEYUSEN CARBON FIBER TECHNOLOGY CO. LTD.",
  // Registered Chinese name and address, as filed with NEEQ (annual reports).
  zhCompany: "江苏泽宇森碳纤维科技股份有限公司",
  // Name before the 2020-06-28 conversion to a joint-stock company.
  zhFormerCompany: "江苏泽宇森碳纤维科技有限公司",
  zhAddress: "江苏省海安市曲塘镇工业集中区（崔母村十组）",
  creditCode: "913206213549457066",
  neeq: { code: "873668", listingDate: "2022-05-18" },
  emails: ["zys@jsfiberglass.com"],
  phones: ["+86-0513-81813680", "+86-18012885770"],
  address:
    "Group 10, Cuimu Village, Industrial Concentration Zone, Qutang Town, Haian County, Nantong City, Jiangsu Province, China",
  structuredAddress: {
    streetAddress: "Group 10, Cuimu Village, Industrial Concentration Zone, Qutang Town",
    addressLocality: "Haian County, Nantong City",
    addressRegion: "Jiangsu Province",
    postalCode: "226600",
    addressCountry: "CN",
  },
  geo: {
    latitude: 32.5312,
    longitude: 120.4672,
  },
  foundingDate: "2015-09-17",
  foundingYear: "2015",
  sgsAudit: {
    reportNo: "QIP-ASI264784",
    verifyUrl: "https://auditedsupplier.sgsgroup.com.cn/",
  },
  sameAs: [
    "https://js-zys.en.made-in-china.com/",
    "http://zysfrp.com/",
    "https://www.youtube.com/channel/UCwP3-wR-SPNxixyzCqxFqLQ",
    "https://www.instagram.com/zeyusen/",
  ],
};

export function companyNameFor(locale: Locale) {
  return locale === "zh" ? contactInfo.zhCompany : contactInfo.company;
}

export function addressFor(locale: Locale) {
  return locale === "zh" ? contactInfo.zhAddress : contactInfo.address;
}

export const primaryEmail = contactInfo.emails[0];
export const primaryPhone = contactInfo.phones[0];
export const whatsappPhone = "8618012885770";
