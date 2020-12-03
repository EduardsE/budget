<script lang="ts">
  import Button from "components/Button.svelte";

  const CLIENT_ID =
    "602604437482-i97nllk2h28qkiia4gd8m86hbmnmrldb.apps.googleusercontent.com";

  const REDIRECT_URI = "http://localhost:3000/oauth/google/callback";
  const scope = "https://www.googleapis.com/auth/userinfo.profile";

  const onAuth = () => {
    window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}`
    );
  };
</script>

<Button variant="light" addClass="color" on:click={onAuth}>
  <slot />
</Button>
