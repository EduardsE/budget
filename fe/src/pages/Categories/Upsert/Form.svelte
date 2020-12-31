<script lang="ts">
  import { onMount } from 'svelte';
  import { COLOR_COMBINATIONS } from 'constants/Category.ts';

  import Button from 'components/Button.svelte';
  import InputText from 'components/Form/InputText.svelte';

  import { form as formData, list } from 'stores/category';
  import http from 'lib/http';

  export let onClose: () => void;

  let customBackground: string = '#0AFFEF';
  let customText: string = '#545454';

  const getColors = () => {
    return $formData.color === 'custom'
      ? [customBackground.substring(1), customText.substring(1)]
      : JSON.parse($formData.color);
  };

  const onUpdate = async () => {
    try {
      const { id, color, ...rest } = $formData;
      const [colorBackground, colorText] = getColors();

      const { category } = await http(`category/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...rest,
          colorBackground,
          colorText,
        }),
      });

      list.update((categories) =>
        categories.map((item) => (item.id === id ? category : item))
      );
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = () => {
    if ($formData.id) {
      onUpdate();
    } else {
      // onCreate()
    }
  };

  onMount(() => {
    // Try to match color presets
    const [colorBackground, colorText] = JSON.parse($formData.color);

    const combo = COLOR_COMBINATIONS.find(
      ({ colorBackground: bg, colorText: text }) => {
        return colorBackground === bg && colorText === text;
      }
    );

    if (!combo) {
      formData.update((data) => ({ ...data, color: 'custom' }));
      customBackground = `#${colorBackground}`;
      customText = `#${colorText}`;
    }
  });
</script>

<style>
  .large-padding {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }
</style>

<div class="p-4">
  <form action="#" method="POST" on:submit|preventDefault={onSubmit}>
    <div class="grid grid-cols-6 gap-6">
      <div class="col-span-6">
        <label
          for="title"
          class="block text-sm font-medium leading-5 text-gray-700">Title</label>
        <InputText id="title" bind:value={$formData.title} />
      </div>

      <fieldset class="col-span-6">
        <legend
          for="badge"
          class="block text-sm font-medium leading-5 text-gray-700">
          Badge
        </legend>
        <div class="flex flex-wrap mt-2 gap-2">
          {#each COLOR_COMBINATIONS as { colorBackground, colorText }}
            <label
              class="border rounded-md flex items-center justify-center px-3 py-2">
              <input
                type="radio"
                bind:group={$formData.color}
                value={JSON.stringify([colorBackground, colorText])}
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <span
                class="ml-2 px-2 inline-flex leading-5 font-semibold rounded-md text-sm large-padding"
                style={`background-color: #${colorBackground}; color: #${colorText}`}>
                {$formData.title || 'Badge'}
              </span>
            </label>
          {/each}
        </div>
        <div>
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-400">or custom color
                combination</span>
            </div>
          </div>
          <div class="flex justify-start gap-6">
            <label
              class="border rounded-md flex items-center justify-center px-3 py-2">
              <input
                type="radio"
                bind:group={$formData.color}
                value="custom"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <span
                class="ml-2 px-2 inline-flex leading-5 font-semibold rounded-md text-sm large-padding"
                style={`background-color: ${customBackground}; color: ${customText}`}>
                {$formData.title || 'Badge'}
              </span>
            </label>
            <div class="flex items-center">
              <span>Background</span>
              <input
                class="w-7 ml-2"
                type="color"
                id="html5colorpicker"
                bind:value={customBackground} />
            </div>
            <div class="flex items-center">
              <span>Text</span>
              <input
                class="w-7 ml-2"
                type="color"
                id="html5colorpicker"
                bind:value={customText} />
            </div>
          </div>
        </div>
      </fieldset>

      <div
        class="px-4 py-4 text-right absolute w-full bottom-0 left-0 border-t">
        <Button addClass="mr-3" variant="light" on:click={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">Save</Button>
      </div>
    </div>
  </form>
</div>
