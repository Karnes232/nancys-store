"use client"

import React from "react"

const ContactForm = () => {
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name")
    const email = formData.get("email")
    const telephone = formData.get("telephone")
    const message = formData.get("message")
    console.log(name, email, telephone, message)

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(
          Array.from(formData.entries()).map(([key, value]) => [
            key,
            String(value),
          ]),
        ).toString(),
      })
    } catch (error) {
      console.error("Submission error:", error)
    }
    // const result = await submitForm(formData)
    // if (result.success) {
    //   try {
    //     const response = await fetch("/__forms.html", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //       body: new URLSearchParams(result.data).toString(),
    //     })

    //     if (response.ok) {
    //       router.push(`/thankyou/?name=${result.data.name}`)
    //     } else {
    //       // Handle error
    //     }
    //   } catch (error) {
    //     console.error("Submission error:", error)
    //   }
    // } else {
    //   console.log("Submission error")
    // }
  }
  return (
    <form
      action={handleSubmit}
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      id="contact"
      className="w-64 md:w-full max-w-md flex flex-col justify-center items-center mx-auto my-20"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="name"
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:text-white"
          placeholder=" "
          required
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Full Name
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email Address
        </label>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="tel"
          name="telephone"
          id="telephone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="telephone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Telephone
        </label>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
        >
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:bg-black"
          placeholder="Leave a comment..."
        ></textarea>
      </div>

      <button
        type="submit"
        className="text-white bg-black/75 hover:bg-black/50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-white/75 dark:hover:bg-white/50 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  )
}

export default ContactForm
