# Apache Airflow Plugin

Welcome to the apache-airflow plugin!

## Installation

TODO: Instructions for closing this repository into an existing project.

## Getting started

This plugin uses the Backstage proxy to securely communicate with the Apache
Airflow API. Add the following to your `app-config.yaml` to enable this
configuration:

```yaml
proxy:
  '/airflow':
    target: http://localhost:8080/api/v1
    headers:
      Authorization: ${AIRFLOW_BASIC_AUTH_HEADER}
```

In your production deployment of Backstage, you would also need to ensure that
you've set the `AIRFLOW_BASIC_AUTH_HEADER` environment variable before starting
the backend.

While working locally, you may wish to hard-code your API key in your
`app-config.local.yaml` like this:

```yaml
# app-config.local.yaml
proxy:
  '/airflow':
    target: http://localhost:8080/api/v1
    headers:
      Authorization: Basic YWlyZmxvdzphaXJmbG93
```

Where the basic authorization token is the base64 encoding of the username and
password of your instance.

```sh
echo -n "airflow:airflow" | base64 -w0
```

## Local Development

For local development, you can setup a local Airflow instance for development
purposes by [running Airflow with Docker Compose][2].

To verify that Airflow is running, and the API is functioning as expected, you
can run the following `curl` command:

```sh
curl -X GET \
    --user "airflow:airflow" \
    localhost:8080/api/v1/dags
```

To run the Backstage proxy, you will have to run start the `example-backend`
plugin.

```sh
yarn workspace example-backend start
```

To verify that the proxy is configured correctly, you can curl the Backstage
proxy endpoint. If using basic authentication, you will have to base64 encode
the username and password:

```sh
curl http://localhost:7007/api/proxy/airflow/dags
```

And finally, to run an instance of this plugin, you can run:

```sh
yarn start
```

## References

[1]: https://airflow.apache.org/docs/apache-airflow/stable/security/api.html
[2]: https://airflow.apache.org/docs/apache-airflow/stable/start/docker.html
[3]: https://airflow.apache.org/docs/apache-airflow/stable/stable-rest-api-ref.html
