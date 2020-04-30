ARG PYTHON_VERSION

FROM python:${PYTHON_VERSION}

ENV PYTHONUNBUFFERED 1
ENV PYTHONOPTIMIZE 1

ENV APP_HOME /app
ENV SRC_HOME $APP_HOME/src
ENV VENV_HOME $APP_HOME/venv

ENV APP_USER covid19cubadata
ENV APP_USER_UID 1000
ENV APP_GROUP covid19cubadata
ENV APP_GROUP_GID 1000


RUN set -eux; \
    echo 'deb http://host.docker.internal:8081/repository/debian-buster buster main' > /etc/apt/sources.list; \
    echo 'deb http://host.docker.internal:8081/repository/debian-buster-security buster/updates main' >> /etc/apt/sources.list; \
    echo 'deb http://host.docker.internal:8081/repository/debian-buster-updates buster-updates main' >> /etc/apt/sources.list;

RUN set -eux; \
    apt-get -qq update; \
    apt-get -qqy install  \
        apt-utils \
        python-virtualenv \
        build-essential; \
    rm -rf /var/lib/apt/lists/*;

ARG TZ=UTC
ENV TZ ${TZ}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata && \
    mkdir /tz && cp /etc/timezone /tz/ && cp /etc/localtime /tz/

RUN groupadd -r -g $APP_GROUP_GID $APP_GROUP && useradd -r -u $APP_USER_UID -d $APP_HOME -g $APP_GROUP $APP_USER
RUN mkdir -p $SRC_HOME && mkdir -p $VENV_HOME
RUN chown -R $APP_USER:$APP_GROUP $SRC_HOME $VENV_HOME

WORKDIR $APP_HOME
RUN virtualenv -p python $VENV_HOME
COPY ./utils/requirements.txt $SRC_HOME
SHELL ["/bin/bash", "-c"]
RUN source $VENV_HOME/bin/activate && pip install -r $SRC_HOME/requirements.txt --index-url http://host.docker.internal:8081/repository/pypi/simple --trusted-host host.docker.internal
COPY ./.container/python/docker-entrypoint.sh /docker-entrypoint.sh
COPY ./utils/update_countries.py $SRC_HOME/update_countries.py
RUN chmod +x /docker-entrypoint.sh && chown $APP_USER:$APP_GROUP /docker-entrypoint.sh && chown $APP_USER:$APP_GROUP $SRC_HOME
USER $APP_USER

ENTRYPOINT ["/docker-entrypoint.sh"]