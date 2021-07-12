import profileReducer, { setUserStatus } from "./profileReducer";

const initState = {
  status: "",
  profile: null,
};

test("status value should be updated", () => {
  const action = setUserStatus("test status");
  const newState = profileReducer(initState, action);

  expect(newState.status).toBe("test status");
});
