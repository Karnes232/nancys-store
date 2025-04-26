import useTranslations from "@/i18n/useTranslations"
import React from "react"

const CartForm = ({
  selectedLang,
  handleSubmit,
  formData,
  setFormData,
}: {
  selectedLang: string
  handleSubmit: (formData: any) => void
  formData: any
  setFormData: (formData: any) => void
}) => {
  const t = useTranslations(selectedLang)
  return (
    <form
      action={handleSubmit}
      name="cart"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      id="cart"
      className="w-80 md:w-full max-w-md flex flex-col justify-center items-center mx-auto my-20"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="cart" />
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="name"
          id="name"
          style={{
            WebkitBoxShadow:
              "0 0 0 30px var(--input-background-color, white) inset",
            WebkitTextFillColor: "var(--input-text-color, black)",
          }}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:bg-black dark:text-white dark:border-gray-600 dark:[--input-background-color:black] dark:[--input-text-color:white]"
          placeholder=" "
          required
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          {t("contact.fullName")}
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="email"
          name="email"
          id="email"
          style={{
            WebkitBoxShadow:
              "0 0 0 30px var(--input-background-color, white) inset",
            WebkitTextFillColor: "var(--input-text-color, black)",
          }}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:bg-black dark:text-white dark:border-gray-600 dark:[--input-background-color:black] dark:[--input-text-color:white]"
          placeholder=" "
          required
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          {t("contact.email")}
        </label>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="tel"
          name="telephone"
          id="telephone"
          style={{
            WebkitBoxShadow:
              "0 0 0 30px var(--input-background-color, white) inset",
            WebkitTextFillColor: "var(--input-text-color, black)",
          }}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:bg-black dark:text-white dark:border-gray-600 dark:[--input-background-color:black] dark:[--input-text-color:white]"
          placeholder=" "
          required
          value={formData.telephone}
          onChange={e =>
            setFormData({ ...formData, telephone: e.target.value })
          }
        />
        <label
          htmlFor="telephone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          {t("contact.telephone")}
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-black/75 hover:bg-black/50 text-white dark:bg-white dark:text-black py-2 px-4 rounded-md hover:dark:bg-white/75"
      >
        {t("contact.submit")}
      </button>
    </form>
  )
}

export default CartForm
