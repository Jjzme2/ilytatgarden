{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "unstable";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # Use the default nodejs package from the unstable channel.
    pkgs.nodejs
  ];

  # Sets environment variables in the workspace
  env = {
    SOME_ENV_VAR = "hello";
  };

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    "angular.ng-template"
  ];

  # Enable previews and customize configuration
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
        ];
        manager = "web";
        cwd = "app/client";
      };
    };
  };

  idx.workspace = {
    # Runs when the workspace is (re)started
    onStart = {
      # Clean install dependencies and set permissions to fix rolldown/vite issues.
      clean-install = "rm -rf app/client/node_modules app/client/package-lock.json && npm install --prefix app/client";
    };
  };
}
