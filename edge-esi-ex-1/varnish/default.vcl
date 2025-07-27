vcl 4.1;

backend default {
    .host = "${VARNISH_BACKEND_HOST}"; # Will be 'nginx' from your ENV
    .port = "${VARNISH_BACKEND_PORT}"; # Will be '80' from your ENV
}

sub vcl_recv {
    # Handle incoming requests, e.g., allow purging
    if (req.method == "PURGE") {
        return (synth(200, "Purged"));
    }
    return (hash);
}

sub vcl_hit {
    # A cached object was found
    return (deliver);
}

sub vcl_miss {
    # No cached object, go to backend
    return (fetch);
}

sub vcl_backend_response {
    # Varnish received a response from the backend
    set beresp.ttl = 1h; # Cache for 1 hour by default

    # --- THIS IS THE KEY FOR ESI PROCESSING ---
    if (beresp.http.Content-Type ~ "(text/html|text/xml)") {
        set beresp.do_esi = true; # Instruct Varnish to process ESI includes
    }
    # ----------------------------------------

    return (deliver);
}

sub vcl_deliver {
    # Prepare response for client
    return (deliver);
}

sub vcl_synth {
    # For synthetic responses (e.g., PURGE success)
    return (deliver);
}