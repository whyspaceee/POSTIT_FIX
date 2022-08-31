import { useFormik } from "formik";
import { signOut } from "next-auth/react";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";

export default function Create() {
  const formik = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());

      setSubmitting(false);

      if (data?.id) {
        resetForm();
      }
    },
  });

  const router = useRouter();
  return (
    <div>
      <Navbar text="Sign Out" handleClick={signOut} />
      <main className="flex justify-center flex-col px-8 lg:px-48 py-12 ">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Title
              </label>
              <input
                id="title"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="content"
              rows="12"
              className="flex p-2.5  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
              onChange={formik.handleChange}
              value={formik.values.content}
              onBlur={formik.handleBlur}
            ></textarea>

            <button
              type="submit"
              onClick={() => router.push("/")}
              className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
