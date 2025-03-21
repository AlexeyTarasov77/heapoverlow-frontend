set -e

# base_path=src/pages
#
# for slice in $(ls $base_path); do
#   pages_path=${base_path}/${slice}/ui
#   for page in $(ls $pages_path); do
#     if [[ "$(echo $page | awk '{print tolower($0)}' )" == *page.tsx ]]; then
#       echo "renaming ${pages_path}/${page} to ${pages_path}/page.tsx"
#       mv ${pages_path}/${page} ${pages_path}/page.tsx
#     fi
#   done
# done

base_path=src/shared/ui

for component in $(ls $base_path); do
  if [[ "$component" != "index.ts" ]] && [[ -f $base_path/$component ]]; then
    dirname=$(echo $component | cut -d '.' -f 1 | awk '{ print tolower($0) }')
    echo $component $dirname
    mkdir ${base_path}/$dirname
    mv ${base_path}/$component $base_path/$dirname
  fi
done
