#!/usr/bin/env bash

# include this function in your prompt to display the active card's key
function jiraf_card() {
    [ ! -f ~/.jiraf/session.json ] && return
    key=$(jq .active_card_key ~/.jiraf/session.json | tr -d '"' | xargs)
    [ "$key" != "" ] && echo "(${key}) "
}
