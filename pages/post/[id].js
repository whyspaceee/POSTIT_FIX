import { useFormik, useFormikContext } from "formik";
import { signOut, useSession } from "next-auth/react";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Post() {
  const [edit, setEdit] = useState(false);
  const { session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery([session], () =>
    fetch(`/api/posts/${id}`).then((res) => res.json())
  );

  const deleteMutation = useMutation(
    () => {
      return (
        fetch(`/api/posts/${id}`),
        {
          method: "DELETE",
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([session]);
      },
    }
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.posts?.title ?? "",
      content: data?.posts?.content ?? "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());

      setSubmitting(false);
      console.log("submitting");

      if (data?.id) {
        resetForm();
        queryClient.invalidateQueries([session]);
      }
    },
  });

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
                disabled={edit ? "" : "disabled"}
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
              disabled={edit ? "" : "disabled"}
              id="content"
              rows="12"
              className="flex p-2.5  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
              onChange={formik.handleChange}
              value={formik.values.content}
              onBlur={formik.handleBlur}
            ></textarea>

            <div className="flex flex-row ">
              <button
                onClick={() => {
                  if (!edit) {
                    setEdit(true);
                  } else {
                    router.push("/");
                  }
                }}
                className="my-6 text-white bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
              text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {edit ? "Submit" : "Edit"}
              </button>
              <button
                onClick={() => {
                  deleteMutation();
                  router.push("/");
                }}
                className="my-6 ml-4 text-white bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
              text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
