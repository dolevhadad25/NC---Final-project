import React, { useState, useEffect } from "react";

function useDeleteWorkout({ id }) {
  const [deletedWorkout, setDeletedWorkout] = useState("");

  function deleteWorkoutHandler() {
    fetch(`/api/schedules/${id}`, {
      method: "DELETE",
    });
    fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });
    setDeletedWorkout(`Delete the ${id} workout successfully.`);
  }

  return {deleteWorkoutHandler, deletedWorkout, setDeletedWorkout};
}

export default useDeleteWorkout;