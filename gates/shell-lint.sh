#!/bin/bash
set -e

sudo apt-get install shellcheck
shellcheck ./*.sh
