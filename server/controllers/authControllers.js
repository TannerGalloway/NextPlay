import supabase from "../utils/supabase.js";

const register = async (req, res) => {
  // Get the email and password from the request
  const { email, password } = req.body;

  // Register the user with Supabase
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error !== null) {
    return res.status(400).json({ error: error });
  }

  // Return the auth session
  return res.status(200).json({ session: data.session });
};

const login = async (req, res) => {
  // Get the email and password from the request
  const { email, password } = req.body;

  // login the user with Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error !== null) {
    return res.status(400).json({ error: error });
  }

  // Return the auth session
  return res.status(200).json({ session: data.session });
};

export { register, login };
