const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/[site]/__layout.svelte"),
	() => import("../../../src/routes/[site]/index.svelte"),
	() => import("../../../src/routes/[site]/[...page].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/[site]/index.svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[3], c[4]], [c[1]], (m) => ({ site: d(m[1])})],

	// src/routes/[site]/[...page].svelte
	[/^\/([^/]+?)(?:\/(.*))?\/?$/, [c[0], c[3], c[5]], [c[1]], (m) => ({ site: d(m[1]), page: d(m[2] || '')})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];