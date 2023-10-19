import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

const Task = ({ data, fetchTodos, next, back }) => {
  const changeStatus = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success"){
      fetchTodos()
    }
  };

  return (
    <div className="tasks">
      {data?.map(
        // آپشنال چینینگ
        (i) => (
          <div key={i._id} className="tasks__card">
            <span className={i.status}></span>
            <RiMastodonLine />
            <h4>{i.title}</h4>
            <div>
              {back ? (
                <button
                  className="button-back"
                  onClick={() => changeStatus(i._id, back)}
                >
                  <BiLeftArrow />
                  Back
                </button>
              ) : null}
              {next ? (
                <button
                  className="button-next"
                  onClick={() => changeStatus(i._id, next)}
                >
                  Next
                  <BiRightArrow />
                </button>
              ) : null}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Task;
