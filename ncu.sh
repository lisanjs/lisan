#!/bin/sh

working_dir=$(PWD)

cd "$working_dir/packages/lisan" && ncu -u
cd "$working_dir/packages/lisan-cli" &&  ncu -u
cd "$working_dir/packages/lisan-compiler" &&  ncu -u
cd "$working_dir/packages/lisan-locales" &&  ncu -u
cd "$working_dir/packages/lisan-plugin-l10n" &&  ncu -u
cd "$working_dir/packages/lisan-plugin-loader" &&  ncu -u
