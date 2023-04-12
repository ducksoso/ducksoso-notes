# X Identity and Access Management

[![pipeline status](../statics/images/pipeline.svg)](https://git.basebit.me/entropy/xiam/-/commits/master) [![coverage report](https://git.basebit.me/entropy/xiam/badges/master/coverage.svg)](https://git.basebit.me/entropy/xiam/-/commits/master)

## Introduction

XIAM is a simple Identity and Access Management system.

It is designed to be used in a microservice architecture, to manage users and their access to resources.

The system design combines the concepts of RBAC and ABAC. It is based on the following principles:
- A user can have multiple roles.
- A role can have multiple actions of a type of resource.
- One resource can have one and only type.
- Policy is a set of rules that define the access control.

## Definitions

### Entity

An entity is an authorization target, usually can be an id, email or user group name.
To create an entity, you need to provide a unique identifier with at least one role of a resource.

### Resource

A resource is an authorization object, usually can be an id or resource group name.
Each resource should have a resource type, which is used to classify related roles and actions.

### Role

A role is a group of authorized actions for one type of resource.

### Policy

A policy is a set of rules that define the access control.
Currently, only the following policy conditions are supported:

- `rbac` - Role Based Access Control
- `time.after` - Current time is after the given time
- `time.before` - Current time is before the given time
- `resource.id` - Resource ID is equal to the given id
- `hierarchy.resource.roles.include` - (A user has) the given roles of one of hierarchy resources

## Common Usage

### CURD of entity, resource, role and policy

By calling the following rpc methods, you can create, get, list and delete of entities, resources, roles and policies.
The method name speaks for itself.

``` protobuf
service XIAM {
  rpc CreateEntity (CreateEntityRequest) returns (CreateEntityResponse) {}
  rpc GetEntity (GetEntityRequest) returns (GetEntityResponse) {}
  rpc ListEntities (ListEntitiesRequest) returns (ListEntitiesResponse) {}
  rpc DeleteEntity (DeleteEntityRequest) returns (DeleteEntityResponse) {}

  rpc CreateRole (CreateRoleRequest) returns (CreateRoleResponse) {}
  rpc UpdateRole (UpdateRoleRequest) returns (UpdateRoleResponse) {}
  rpc GetRole (GetRoleRequest) returns (GetRoleResponse) {}
  rpc ListRoles (ListRolesRequest) returns (ListRolesResponse) {}
  rpc DeleteRole (DeleteRoleRequest) returns (DeleteRoleResponse) {}

  rpc CreateResource (CreateResourceRequest) returns (CreateResourceResponse) {}
  rpc ListResources (ListResourcesRequest) returns (ListResourcesResponse) {}
  rpc DeleteResource (DeleteResourceRequest) returns (DeleteResourceResponse) {}

  rpc CreatePolicy (CreatePolicyRequest) returns (CreatePolicyResponse) {}
  rpc DeletePolicy (DeletePolicyRequest) returns (DeletePolicyResponse) {}
}
```

As for granting and revoking roles of an entity, you can call the following methods:

```protobuf
rpc GrantEntityRole (GrantEntityRoleRequest) returns (GrantEntityRoleResponse) {}
rpc RevokeEntityRole (RevokeEntityRoleRequest) returns (RevokeEntityRoleResponse) {}
```

### Resource Hierarchy

XIAM supports resource hierarchy, which means a resource can have a parent resource.
One entity may have access to a resource by having a role of parent resource without having any role of the resource itself.

Let's assume the following:
- there is one role `dataset-owner`, which have `dataset.view` and `dataset.edit` actions of `dataset` resource;
- there is one role `project-owner`, which have `project.view` and `project.edit` actions of `project` resource; and
- there is one policy `project-owner-can-view-dataset`, which has `hierarchy.resource.roles.include:project-owner` condition to let `project-owner` to have `dataset.view` permission of its 'child' `dataset` resource.

Then, an entity can have `dataset.view` access to `dataset`-kind resource 'datasetA' by:
- having `dataset-owner` role of 'datasetA', or
- having `project-owner` role of `project`-kind resource 'projectB', with 'datasetA' having a hierarchy resource 'projectB', or
- both.

To make this kind of relation recognized by XIAM, you need to create both 'datasetA' and 'projectB' as resources,
and set 'projectB' as the parent of 'datasetA' by calling this following methods: 

```protobuf
rpc CreateResourceHierarchy (CreateResourceHierarchyRequest) returns (CreateResourceHierarchyResponse) {}
```

And vice versa, to remove this kind of relation, you can call this method:

```protobuf
rpc DeleteResourceHierarchy (DeleteResourceHierarchyRequest) returns (DeleteResourceHierarchyResponse) {}
```

### Authorization

To check if an entity has access to a resource, you can always use the following method:

```protobuf
rpc CheckResourceAction (CheckResourceActionRequest) returns (CheckResourceActionResponse) {}
```

This method will check if the required action can be performed on the resource by the entity, by checking all policies that match the resource, action and conditions.

For example, in the above example, if you want to check if an entity can view a dataset, you can check it by calling this method:

```json
{
  "entity_id": "user@email.com",
  "resource_id": "datasetA",
  "action": "dataset.view"
}
```

And you may also use only a role of hierarchy resource to check some permissions, often used in creating a child resource, for example:

```json
{
  "entity_id": "user@email.com",
  "resource_type": "dataset",
  "hierarchy_resource_id": "projectB",
  "action": "dataset.create"
}
```

This kind of request will look for policies to check if the entity can perform 'dataset.create' action under the project 'projectB'.





