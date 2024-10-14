import Input from "./components/Input";
import Button from "./components/Button";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  createData,
  fetchSingleData,
  updateSingleData,
  deleteSingleData,
} from "./store/infoSlice";

function App() {
  const [field, setField] = useState({ id: "", name: "" });
  const [err, setErr] = useState();
  const [msg, setMsg] = useState();

  const { infos, error, message } = useSelector((state) => state.infobase);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleField = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const data = {
      id: field.id,
      name: field.name,
    };

    if (field.id) {
      dispatch(updateSingleData(data)).then((res) => {
        if (res.payload.errors) {
          let er = {};
          for (let i = 0; i < res.payload.errors.length; i++) {
            const k = res.payload.errors[i].path;
            const v = res.payload.errors[i].msg;
            er[k] = v;
          }
          setErr(er);
        } else {
          setMsg(res.payload.msg);
          setTimeout(() => {
            setMsg();
          }, 2000);
          setField({ id: "", name: "" });
          setErr();
          dispatch(fetchData());
        }
      });
    } else {
      delete data["id"];
      dispatch(createData(data)).then((res) => {
        if (res.payload.errors) {
          let er = {};
          for (let i = 0; i < res.payload.errors.length; i++) {
            const k = res.payload.errors[i].path;
            const v = res.payload.errors[i].msg;
            er[k] = v;
          }
          setErr(er);
        } else {
          setMsg(res.payload.msg);
          setTimeout(() => {
            setMsg();
          }, 2000);
          setField({ id: "", name: "" });
          setErr();
          dispatch(fetchData());
        }
      });
    }
  };

  const singleData = async (id) => {
    dispatch(fetchSingleData(id)).then((res) => {
      setField({ id: res.payload.id, name: res.payload.name });
      // console.log(res);
    });
  };

  const deleteData = async (id) => {
    dispatch(deleteSingleData(id)).then(() => {
      dispatch(fetchData());
    });
  };

  return (
    <>
      <div className="w-[400px] mx-auto bg-white mt-6 p-3">
        {msg && (
          <div className="p-1 bg-green-300 mb-1 rounded text-xs text-center">
            {msg}
          </div>
        )}
        <form onSubmit={submitData}>
          <div className="shadow-sm rounded-sm flex">
            <input
              type="hidden"
              id="id"
              placeholder="ID..."
              name="id"
              onChange={handleField}
              value={field.id}
            />
            <Input
              type="text"
              id="name"
              placeholder="Name..."
              name="name"
              onChange={handleField}
              value={field.name}
              err={err?.name}
            />
            <Button
              type="submit"
              label="Save"
              className="btn btn-primary ms-2"
              icon="bi bi-save"
            />
          </div>
        </form>
      </div>
      <div className="w-[400px] bg-white p-3 mx-auto mt-6 rounded-sm">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {infos.result &&
              infos.result.map((el) => (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td className="text-center">
                    <Button
                      type="button"
                      className="btn btn-primary"
                      icon="bi bi-pencil-square"
                      onClick={() => singleData(el.id)}
                    />
                    <Button
                      type="button"
                      className="btn btn-danger"
                      icon="bi bi-trash"
                      onClick={() => deleteData(el.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
