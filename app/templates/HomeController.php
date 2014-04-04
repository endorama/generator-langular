<?php

class HomeController extends BaseController {

  /**
   * Route::get('/', 'HomeController@index');
   *
   * Handle angular application, displaying view based on environment
   */
  public function index() {
    if (App::environment() === 'production')
      return View::make('angularjs.application_production');

    return View::make('angularjs.application');
  }

}
