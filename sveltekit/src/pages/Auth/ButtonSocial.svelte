<script lang="ts">
	import { goto } from '$app/navigation';
	import http from '$lib/http';

	import { user as userStore } from 'stores/user';

	import Button from 'components/Button.svelte';

	const onAuth = async () => {
		// @ts-ignore
		const provider = new firebase.auth.GoogleAuthProvider();

		try {
			// @ts-ignore
			const { additionalUserInfo, credential, user } = await firebase
				// @ts-ignore
				.auth()
				.signInWithPopup(provider);

			const { accessToken } = credential;
			const { uid, refreshToken } = user;
			const { name, picture, email } = additionalUserInfo.profile;

			// @ts-ignore
			const idToken = await firebase.auth().currentUser.getIdToken(true);

			const { token, user: dbUser } = await http('firebase/verify', {
				method: 'POST',
				body: JSON.stringify({
					idToken,
					user: { accessToken, refreshToken, email, picture, name, id: uid }
				})
			});

			userStore.set(user);
			goto(`/`);
		} catch (error) {}
	};
</script>

<Button variant="light" addClass="color" on:click={onAuth}>
	<slot />
</Button>
