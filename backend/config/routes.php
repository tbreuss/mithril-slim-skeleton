<?php

declare(strict_types = 1);

use App\Middleware\AuthMiddleware;
use Slim\App;
use Slim\Exception\HttpNotFoundException;
use Slim\Routing\RouteCollectorProxy;

return function (App $app) {
    // cors
    $app->options('/{routes:.+}', \App\Action\PreflightAction::class)->setName('preflight');

    // public routes
    $app->group('/v1', function (RouteCollectorProxy $group) {
        $group->get('/contacts/{id}', \App\Action\Contact\ContactDetailAction::class)->setName('contacts.detail');
        $group->get('/contacts', \App\Action\Contact\ContactListAction::class)->setName('contacts.list');
        $group->post('/login', \App\Action\LoginAction::class)->setName('login');
        $group->get('/organizations/{id}', \App\Action\Organization\OrganizationDetailAction::class)->setName('organizations.detail');
        $group->get('/organizations', \App\Action\Organization\OrganizationListAction::class)->setName('organizations.list');
        $group->get('/ping', \App\Action\PingAction::class)->setName('ping');
    });

    // protected routes
    $app->group('/v1/admin', function (RouteCollectorProxy $group) {
        $group->get('/users/{id}', \App\Action\Admin\User\UserDetailAction::class)->setName('admin.users.detail');
        $group->delete('/users/{id}', \App\Action\Admin\User\UserDeleteAction::class)->setName('admin.users.delete');
        $group->get('/users', \App\Action\Admin\User\UserListAction::class)->setName('admin.users.list');
        $group->put('/users/{id}', \App\Action\Admin\User\UserUpdateAction::class)->setName('admin.users.update');
        $group->post('/users', \App\Action\Admin\User\UserCreateAction::class)->setName('admin.users.create');
    })->add(new AuthMiddleware());

    // cors
    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request) {
        throw new HttpNotFoundException($request);
    });
};
