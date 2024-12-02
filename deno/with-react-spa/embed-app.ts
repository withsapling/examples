/// <reference lib="deno.ns" />

// Change directory to app folder, build the React app, and copy dist files to static
const buildAndEmbed = async () => {
  // Delete /static/app folder
  const deleteProcess = new Deno.Command("rm", {
    args: ["-rf", "./static/app"],
  });
  const deleteOutput = await deleteProcess.output();

  if (!deleteOutput.success) {
    throw new Error("Failed to delete app folder");
  }

  // Change to app directory
  Deno.chdir("./app");

  // Run npm build command
  const buildProcess = new Deno.Command("npm", {
    args: ["run", "build"],
  });
  const buildOutput = await buildProcess.output();

  if (!buildOutput.success) {
    throw new Error("Build failed");
  }

  // // rename index.html to app.html
  // const renameProcess = new Deno.Command("mv", {
  //   args: ["dist/index.html", "dist/app.html"],
  // });
  // const renameOutput = await renameProcess.output();

  // if (!renameOutput.success) {
  //   throw new Error("Failed to rename index.html to app.html");
  // }

  // Copy dist folder contents to static directory
  const copyProcess = new Deno.Command("cp", {
    args: ["-r", "dist/.", "../static/app/"],
  });
  const copyOutput = await copyProcess.output();

  if (!copyOutput.success) {
    throw new Error("Failed to copy dist files to static directory");
  }



  // Change back to original directory
  Deno.chdir("..");
};

// Execute the build and embed process
await buildAndEmbed();
