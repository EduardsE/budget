import iterm2

async def main(connection):
    app = await iterm2.async_get_app(connection)
    window = app.current_terminal_window
    if window is not None:
        await window.async_create_tab()
    else:
        print("No current window")

    first = app.current_terminal_window.current_tab.current_session
    second = await first.async_split_pane(vertical=False)
    third = await second.async_split_pane(vertical=False)

    await third.async_send_text('cd code/budget && docker-compose down && docker-compose up\n')
    await first.async_send_text('cd code/budget/fe-snowpack && yarn start\n')
    await second.async_send_text('cd code/budget/be && yarn start\n')

iterm2.run_until_complete(main)