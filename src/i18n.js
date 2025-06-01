import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources inline (simple setup without separate files)
const resources = {
  en: {
    translation: {
      switchToChinese: "Switch to Chinese",
      switchToEnglish: "Switch to English",
      trackPackagePlaceholder: "Track your package instantly",
      trackPackageButton: "Track Package",
      viewPackageButton: "View My Package",
      statusLabel: "Status",
      locationLabel: "Location",
      destinationLabel: "Destination",
      estimatedDeliveryLabel: "Estimated Delivery",
      noImageAvailable: "No image available for this package.",
      contactInfo: "For more inquiries, contact our agent on QQ: 3940893022 (QQID: 4580Anton)"
    }
  },
  zh: {
    translation: {
      switchToChinese: "切换到中文",
      switchToEnglish: "切换到英文",
      trackPackagePlaceholder: "立即查询您的包裹",
      trackPackageButton: "查询包裹",
      viewPackageButton: "查看我的包裹",
      statusLabel: "状态",
      locationLabel: "位置",
      destinationLabel: "目的地",
      estimatedDeliveryLabel: "预计送达时间",
      noImageAvailable: "此包裹暂无图片。",
      contactInfo: "如有疑问，请通过 QQ 联系我们的代理：3940893022（QQ号：4580Anton）"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
