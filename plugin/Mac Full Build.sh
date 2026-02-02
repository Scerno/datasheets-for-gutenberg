#!/usr/bin/env bash
set -euo pipefail

# Run from the folder this script lives in
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}"

PLUGIN_NAME="datasheets-building-blocks"
ZIP_NAME="${PLUGIN_NAME}.zip"

echo "Building Gutenberg blocks..."
npm run build

echo "Packaging plugin..."
TMP_DIR="$(mktemp -d)"
mkdir -p "${TMP_DIR}/${PLUGIN_NAME}"

# Copy only what you want to ship
cp -R build "${TMP_DIR}/${PLUGIN_NAME}/"

if [ -d "includes" ]; then cp -R includes "${TMP_DIR}/${PLUGIN_NAME}/"; fi
if [ -d "languages" ]; then cp -R languages "${TMP_DIR}/${PLUGIN_NAME}/"; fi

cp "${PLUGIN_NAME}.php" "${TMP_DIR}/${PLUGIN_NAME}/"

if [ -f "readme.txt" ]; then cp readme.txt "${TMP_DIR}/${PLUGIN_NAME}/"; fi
if [ -f "package.json" ]; then cp package.json "${TMP_DIR}/${PLUGIN_NAME}/"; fi

# Ensure no dev folders sneak in
rm -rf "${TMP_DIR:?}/${PLUGIN_NAME}/node_modules" "${TMP_DIR:?}/${PLUGIN_NAME}/src" 2>/dev/null || true

# Create zip with correct top-level plugin folder
rm -f "${ZIP_NAME}"
( cd "${TMP_DIR}" && zip -qr "${OLDPWD}/${ZIP_NAME}" "${PLUGIN_NAME}" )

rm -rf "${TMP_DIR}"

echo "Build + packaging complete!"
echo "Created: ${ZIP_NAME}"
