/****************************************************************************************
 * Fastfox                                                                              *
 * "Non ducor duco"                                                                     *
 * priority: speedy browsing                                                            *
 * version: 107a                                                                        *
 * url: https://github.com/yokoffing/Betterfox                                          *
 ***************************************************************************************/
 
// PREF: initial paint delay
// How long FF will wait before rendering the page
// [1] https://kb.mozillazine.org/Nglayout.initialpaint.delay
user_pref("nglayout.initialpaint.delay", 2); // default=5; used to be 250
user_pref("nglayout.initialpaint.delay_in_oopif", 2); // default=5; used to be 250

// PREF: control how tabs are loaded when a session is restored
// true=Tabs are not loaded until they are selected (default)
// false=Tabs begin to load immediately.
user_pref("browser.sessionstore.restore_pinned_tabs_on_demand", true);

// PREF: disable preSkeletonUI on startup
user_pref("browser.startup.preXulSkeletonUI", false);

// PREF: set the minimum interval between session save operations
// Increasing this can help on older machines and some websites, as well as reducing writes
// [1] https://bugzilla.mozilla.org/1304389
user_pref("browser.sessionstore.interval", 30000); // [DEFAULT: 15000]

// PREF: enable importMaps [FF108+]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1688879
// [2] https://github.com/WICG/import-maps#the-basic-idea
// [3] https://caniuse.com/import-maps
user_pref("dom.importMaps.enabled", true); // DEFAULT FF108+
    user_pref("javascript.options.experimental.import_assertions", true);
    
/****************************************************************************
 * SECTION: EXPERIMENTAL                                                    *
****************************************************************************/

// PREF: about:home startup cache [NIGHTLY]
// A cache for the initial about:home document that is loaded by default at startup
// The purpose of the cache is to improve startup performance
user_pref("browser.startup.homepage.abouthome_cache.enabled", true);

// PREF: CSS Masonry Layout [NIGHTLY]
user_pref("layout.css.grid-template-masonry-value.enabled", true);

// PREF: Prioritized Task Scheduling API [NIGHTLY]
// [1] https://blog.mozilla.org/performance/2022/06/02/prioritized-task-scheduling-api-is-prototyped-in-nightly/
// [2] https://medium.com/airbnb-engineering/building-a-faster-web-experience-with-the-posttask-scheduler-276b83454e91
user_pref("dom.enable_web_task_scheduling", true);

// PREF: enable animation-composition [NIGHTLY]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1785329
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1293490
// [3] https://developer.mozilla.org/en-US/docs/Web/CSS/animation-composition
user_pref("layout.css.animation-composition.enabled", true);

// PREF: Shadowrealms [NIGHTLY]
// [1] https://github.com/tc39/proposal-shadowrealm/blob/main/explainer.md#introduction
user_pref("javascript.options.experimental.shadow_realms", true);

// PREF: Wasm GC [NIGHTLY]
// [1] https://github.com/WebAssembly/gc/blob/main/proposals/gc/Overview.md
user_pref("javascript.options.wasm_gc", true);

// PREF: Wasm Function References [NIGHTLY]
// [1] https://github.com/WebAssembly/function-references/blob/master/proposals/function-references/Overview.md
user_pref("javascript.options.wasm_function_references", true);

/****************************************************************************
 * SECTION: NETWORK                                                         *
****************************************************************************/

// PREF: faster SSL
user_pref("network.ssl_tokens_cache_capacity", 32768); // more TLS token caching (fast reconnects)

// PREF: increase DNS cache
user_pref("network.dnsCacheEntries", 20000);	
user_pref("network.dnsCacheExpiration", 3600);	
user_pref("network.dnsCacheExpirationGracePeriod", 240);

// PREF: use bigger packets
// [1] https://www.mail-archive.com/support-seamonkey@lists.mozilla.org/msg74561.html
// [2] https://www.mail-archive.com/support-seamonkey@lists.mozilla.org/msg74570.html
user_pref("network.buffer.cache.size", 262144); // preferred=327680; default=32768
user_pref("network.buffer.cache.count", 128); // preferred=240; default=24

// These do not affect anything, probably:

// PREF: close a connection if tls handshake does not finish in given number of seconds
user_pref("network.http.tls-handshake-timeout", 7); // default=30

// PREF: timeout connections if an initial response is not received in number of seconds
user_pref("network.http.response.timeout", 7); // default=300

// PREF: increase the absolute number of http connections
// [1] https://kb.mozillazine.org/Network.http.max-connections
// [2] https://kb.mozillazine.org/Network.http.max-persistent-connections-per-server
user_pref("network.http.max-connections", 1800); // default=900
    user_pref("network.http.max-persistent-connections-per-server", 8); // default=6; download connections; anything above 10 is excessive

/****************************************************************************
 * SECTION: MAKE FIREFOX FAST                                               *
 * [NOTE] The following is not recommended for low-end machines             *
 * Credit for most of these:                                                *
 * https://gist.github.com/RubenKelevra/fd66c2f856d703260ecdf0379c4f59db    *
 * [NOTE] For best performance on older hardware, you will need to test     *
 * these settings individually.                                             *
****************************************************************************/

/****************************************************************************
 * SECTION: GFX RENDERING TWEAKS                                            *
****************************************************************************/

// PREF: Webrender tweaks
// [1] https://hacks.mozilla.org/2017/10/the-whole-web-at-maximum-fps-how-webrender-gets-rid-of-jank/
// [2] https://wiki.mozilla.org/Platform/GFX/WebRender_Where
// [3] https://www.reddit.com/r/firefox/comments/fo1jwz/make_firefox_faster/flhh5l2/
// [4] https://www.troddit.com/r/firefox/comments/tbphok/is_setting_gfxwebrenderprecacheshaders_to_true/i0bxs2r/
user_pref("gfx.webrender.all", true); // enables WR (GPU) + additional features
user_pref("gfx.webrender.precache-shaders", true);
user_pref("gfx.webrender.compositor", true);
    user_pref("gfx.webrender.compositor.force-enabled", true); // reinforce

// PREF: if your hardware doesn't support Webrender, you can fallback to Webrender's software renderer
// [1] https://www.ghacks.net/2020/12/14/how-to-find-out-if-webrender-is-enabled-in-firefox-and-how-to-enable-it-if-it-is-not/
//user_pref("gfx.webrender.enabled", true);
//user_pref("gfx.webrender.software", true); // Webrender uses the CPU and not the GPU
    //user_pref("gfx.webrender.software.opengl", true); [LINUX]

// PREF: GPU-accelerated Canvas2D tweaks
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1739448
user_pref("gfx.canvas.accelerated", true);
user_pref("gfx.canvas.accelerated.cache-items", 32768);
user_pref("gfx.canvas.accelerated.cache-size", 4096);
user_pref("gfx.content.skia-font-cache-size", 80);

// PREF: image tweaks
user_pref("image.cache.size", 10485760);
user_pref("image.mem.decode_bytes_at_a_time", 131072); // alt=65536; preferred=262144; chunk size for calls to the image decoders
user_pref("image.mem.shared.unmap.min_expiration_ms", 120000); // default=60000; minimum timeout to unmap shared surfaces since they have been last used
user_pref("layers.gpu-process.enabled", true);
    user_pref("layers.gpu-process.force-enabled", true); // reinforce

// PREF: increase media cache
user_pref("media.memory_cache_max_size", 1048576); // alt=512000; also in Securefox (inactive there)
user_pref("media.memory_caches_combined_limit_kb", 2560000); // preferred=3145728; // default=524288
    user_pref("media.memory_caches_combined_limit_pc_sysmem", 20); // default=5
user_pref("media.ffmpeg.vaapi.enabled", true); // [LINUX]
user_pref("media.hardware-video-decoding.enabled", true);
    user_pref("media.hardware-video-decoding.force-enabled", true); // reinforce

// PREF: decrease video buffering
// [NOTE] Does not affect YouTube since it uses DASH playback [1]
// [1] https://lifehacker.com/preload-entire-youtube-videos-by-disabling-dash-playbac-1186454034
user_pref("media.cache_size", 2048000); // default=512000
user_pref("media.cache_readahead_limit", 9000); // default=60; stop reading ahead when our buffered data is this many seconds ahead of the current playback
user_pref("media.cache_resume_threshold", 6000); // default=30; when a network connection is suspended, don't resume it until the amount of buffered data falls below this threshold (in seconds)
    
// PREF: faster upload speed
// Firefox currently has a bug with impacting upload speeds with HTTP3/QUIC
// [TEST] https://speedof.me/
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1753486
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1596576
user_pref("network.http.http3.enable", false); // disables HTTP3/QUIC
user_pref("network.http.http2.chunk-size", 32000); // preferred=48000; default=16000 [needed?]

/****************************************************************************
 * SECTION: BROWSER CACHE                                                   *
****************************************************************************/

// PREF: re-enable disk cache (optional)
// [EXTENSION] https://addons.mozilla.org/en-US/firefox/addon/cache-longer/
//user_pref("browser.cache.disk.enable", true); // SecureFox override
//user_pref("browser.cache.disk.max_entry_size", 51200); // DEFAULT
//user_pref("browser.cache.disk.smart_size.enabled", false); // disable adaptive cache size on disk
//user_pref("browser.cache.disk.capacity", 8192000); // 8 GB cache on disk
//user_pref("browser.cache.max_shutdown_io_lag", 16); // number of seconds the cache spends writing pending data and closing files after shutdown has been signalled
//user_pref("browser.cache.frecency_half_life_hours", 128); // lower cache sweep intervals, the half life used to re-compute cache entries frecency (in hours)
// disable clearing cache on shutdown:
//user_pref("privacy.clearOnShutdown.cache", false);

// PREF: increase memory cache size (recommended)
// [1] https://www.makeuseof.com/tag/how-much-data-does-youtube-use/
//user_pref("browser.cache.memory.capacity", 5242880); // default=-1; 256000=256MB, 512000=512MB, 1024000=1GB, 2097152=2GB, 5242880=5GB, 8388608=8GB
user_pref("browser.cache.memory.max_entry_size", 153600); // alt=51200; preferred=327680 ; -1 -> entries bigger than than 90% of the mem-cache are never cached

// PREF: Disable WebGL debug info
user_pref("webgl.enable-debug-renderer-info", false);