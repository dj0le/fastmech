# Mech Index Front End

This is the front end implementation for the mech index project. The mech index is a list of many popular Battletech mechs. The full project uses a wide assortment of technologies. The front end is build in svelte 5 with typescript, and uses Open Props for efficient CSS styling. The back end was written in Python, using FastAPI. The database is SQL Lite. The project is hosted on a VPS running Coolify.

To see the current project implementation:

[`https://mech-index.com/`](https://mech-index.com/).

## Developing:

Steps to run this locally:

```bash
# 1. Clone the repo
git clone https://github.com/dj0le/fastmech.git

# 2. from inside the cloned directory, install dependencies:
npm install

# 3. Start the server and open the app in a new browser tab
npm run dev -- --open
```

## Further Steps:

This front end connects with a FASTAPI Backend. The code, and installation instructions for the backend are available in this repo:

[`Mech-Index Backend code`](https://github.com/dj0le/mech-index)

## Remaining Steps:

1. Add Filtering and Dynamic Search to the front carousel
2. Better transitions from details page
3. Fix details page headline / svg
