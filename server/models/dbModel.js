import supabase from "../utils/supabase.js";

const library = {
    // Save game id into database
  addToLibrary: async (gameID, session) => {
    const { error } = await supabase
      .from("library")
      .insert([{ game_id: gameID, user: session }]);

    if (error) {
      return error;
    }
  },
};

export { library };
