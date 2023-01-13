#!/bin/bash

# argv

# functions

function _main
{
    pg_isready -d ${POSTGRES_DB} -U ${POSTGRES_USER}
    [ $? -ne 0 ] && exit 1
    exit 0
}

# main

_main "$@"