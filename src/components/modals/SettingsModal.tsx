import { Field, Label, Select, Switch } from "@headlessui/react";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { availableLanguages, localeLanguageKey } from "../../i18n/i18n";
import { useTheme } from "../../lib/theme";
import { BaseModal } from "./BaseModal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const SettingsModal = ({ isOpen, handleClose }: Props) => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const onChangeValue = (event: ChangeEvent<HTMLSelectElement>) => {
    const code = event.target.value;

    i18n.changeLanguage(code);
    localStorage.setItem(localeLanguageKey, code);
  };

  return (
    <BaseModal title={t("settings")} isOpen={isOpen} handleClose={handleClose}>
      <Field className="flex border-b-1 pb-2 pt-2 border-neutral">
        <Label className="flex flex-1">{t("darkMode")}</Label>
        <Switch
          checked={theme === "dark"}
          onChange={(val) => setTheme(val ? "dark" : "light")}
          className="group flex h-6 w-11 items-center rounded-full bg-neutral transition data-checked:bg-present"
        >
          <span className="size-4 translate-x-1 rounded-full bg-writing transition group-data-checked:translate-x-6" />
        </Switch>
      </Field>
      <Field className="flex pb-2 pt-2 items-center">
        <Label className="flex flex-1">{t("pickYourLanguage")}</Label>
        <Select onChange={onChangeValue} name="status" className="rounded-md p-1 bg-neutral">
          {availableLanguages.map((code) => (
            <option key={code} value={code}>
              {t(`languages.${code}`)}
            </option>
          ))}
        </Select>
      </Field>
    </BaseModal>
  );
};
