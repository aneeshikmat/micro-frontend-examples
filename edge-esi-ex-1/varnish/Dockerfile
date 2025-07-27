FROM varnish:7.3

# Copy the VCL configuration file template
COPY default.vcl /etc/varnish/default.vcl.template

# Expose port 80
EXPOSE 80

# Set Varnish cache size and other parameters
ENV VARNISH_SIZE=256M \
    VARNISH_LISTEN=:80 \
    VARNISH_BACKEND_HOST=nginx \
    VARNISH_BACKEND_PORT=80

# Fix permissions and install required packages
USER root
RUN apt-get update && apt-get install -y gettext-base && \
    chown -R varnish:varnish /etc/varnish
USER varnish

# Use ENTRYPOINT to substitute variables and then start Varnish
ENTRYPOINT ["/bin/bash", "-c", "envsubst < /etc/varnish/default.vcl.template > /etc/varnish/default.vcl && varnishd -F -f /etc/varnish/default.vcl -s malloc,${VARNISH_SIZE} -a ${VARNISH_LISTEN} -p feature=+esi_disable_xml_check,+esi_include_onerror"]