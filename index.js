const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Configura Supabase
const SUPABASE_URL = 'https://ugsagfppqazrdyyikvcg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnc2FnZnBwcWF6cmR5eWlrdmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MjAxOTYsImV4cCI6MjA2MjQ5NjE5Nn0.PMDD-GWxpFsWjXc0jtDVYPK4JaZpKS0E9WkYLdJNp9g';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// Endpoint: ottieni missioni attive per un personaggio
app.get('/missions/:character_id', async (req, res) => {
  const { character_id } = req.params;

  const { data, error } = await supabase
    .from('character_missions')
    .select('mission_id, missions(title, status)')
    .eq('character_id', character_id)
    .eq('missions.status', 'active')
    .maybeSingle();

  if (error) return res.status(500).json({ error });

  res.json(data);
});

app.listen(port, () => {
  console.log(`Frester API server listening at http://localhost:${port}`);
});
